import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class ApiService {
  final Dio _dio = Dio(
    BaseOptions(
      baseUrl: dotenv.env['API_URL'] ?? 'http://localhost:8080/api/v1',
      connectTimeout: const Duration(seconds: 10),
      receiveTimeout: const Duration(seconds: 10),
    ),
  );

  final _storage = const FlutterSecureStorage();

  ApiService() {
    _dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) async {
          final token = await _storage.read(key: 'token');
          if (token != null) {
            options.headers['Authorization'] = 'Bearer $token';
          }
          return handler.next(options);
        },
        onError: (DioException e, handler) {
          // Handle global errors here
          return handler.next(e);
        },
      ),
    );
  }

  Dio get dio => _dio;
}
