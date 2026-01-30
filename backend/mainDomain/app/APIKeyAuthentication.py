from django.http import JsonResponse
from django.conf import settings

class APIKeyMiddleware:

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):

        # Apply only on API URLs
        if request.path.startswith('/api/'):

            api_key = request.headers.get('Authorization')

            if not api_key:
                return JsonResponse(
                    {"error": "API key missing"},
                    status=400
                )

            if api_key != settings.API_SECRET_KEY:
                return JsonResponse(
                    {"error": "Invalid API key"},
                    status=401
                )

        return self.get_response(request)
