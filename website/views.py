from django.shortcuts import render

# Create your views here.

def home(request):
    return render(request, 'index.html')

from django.core.mail import send_mail
from django.shortcuts import render, redirect
from django.contrib import messages

def contact_view(request):
    if request.method == "POST":
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        message = request.POST.get('message')

        # Format the email content
        full_message = f"New Inquiry from {name} ({email}):\n\n{message}"

        # Send the mail
        send_mail(
            subject,
            full_message,
            email, # From user
            ['hashcord.co@gmail.com'], # To you
            fail_silently=False,
        )
        
        messages.success(request, "Message sent successfully!")
        return redirect('home') # Redirect to home after sending
    
    return render(request, 'index.html')


def privacy_view(request):
    return render(request, 'legal/privacy.html')

def terms_view(request):
    return render(request, 'legal/terms.html')