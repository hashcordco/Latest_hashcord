from django.shortcuts import render, redirect
from django.contrib import messages
from django.core.mail import EmailMessage

def home(request):
    return render(request, 'index.html')

def contact_view(request):
    if request.method == "POST":
        name = request.POST.get('name')
        user_email = request.POST.get('email')
        subject = request.POST.get('subject')
        message = request.POST.get('message')

        # 1. Format the email body to clearly show who it's from
        full_message = f"You have a new inquiry from Hashcord's contact form:\n\n" \
                       f"Name: {name}\n" \
                       f"Email: {user_email}\n" \
                       f"Subject: {subject}\n\n" \
                       f"Message:\n{message}"

        # 2. Use EmailMessage instead of send_mail
        email = EmailMessage(
            subject=f"New Lead: {subject}",
            body=full_message,
            from_email='hashcord.co@gmail.com', # Always send FROM your authenticated email
            to=['hashcord.co@gmail.com'],        # Send TO yourself
            reply_to=[user_email],              # THIS makes it so when you hit "Reply", it goes to the user
        )

        try:
            email.send(fail_silently=False)
            messages.success(request, "Message sent successfully!")
        except Exception as e:
            messages.error(request, f"Message failed to send. Error: {e}")
            
        return redirect('home')
    
    return render(request, 'index.html')


def privacy_view(request):
    return render(request, 'legal/privacy.html')

def terms_view(request):
    return render(request, 'legal/terms.html')
