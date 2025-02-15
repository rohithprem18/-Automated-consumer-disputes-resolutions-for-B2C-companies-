import { CategoryData } from '../types/chat';

export const categoryData: Record<string, CategoryData> = {
  billing: {
    title: "Billing & Payments Support",
    quickReplies: [
      { text: "Why was I charged twice?", action: "double_charge" },
      { text: "Update payment method", action: "update_payment" },
      { text: "Cancel subscription", action: "cancel_sub" },
      { text: "Request refund", action: "refund" },
      { text: "Billing date changed", action: "billing_date" },
      { text: "Payment declined", action: "payment_declined" },
      { text: "Price increase", action: "price_increase" },
      { text: "Extra charges", action: "extra_charges" },
      { text: "Payment history", action: "payment_history" },
      { text: "Free trial questions", action: "free_trial" }
    ],
    responses: {
      double_charge: "I understand your concern about the double charge. Let me help you verify this:\n1. Please check your bank statement for the exact dates\n2. Sometimes pending authorizations may appear as double charges\n3. I can check if there were any system issues on our end\nCould you confirm the dates of the charges you're seeing?",
      
      update_payment: "I'll guide you through updating your payment method:\n1. Go to Account Settings\n2. Select Payment Information\n3. Click 'Manage Payment Info'\n4. Add or update your payment method\nWould you like me to explain any of these steps in more detail?",
      
      cancel_sub: "I can help you cancel your subscription. Before proceeding:\n1. Your access continues until the end of the billing period\n2. You can download your viewing history\n3. You can reactivate anytime\nWould you like to proceed with cancellation?",
      
      refund: "Let me help you with your refund request:\n1. Please provide the charge date\n2. Explain the reason for the refund\n3. I'll check if you're eligible for a refund\n4. Processing time is typically 3-5 business days\nCan you share more details about the charge?",
      
      billing_date: "Regarding your billing date change:\n1. Changes occur when you modify your subscription\n2. The new date becomes your regular billing date\n3. You can request to adjust this\nWould you like to know why it changed or adjust it?",
      
      payment_declined: "I see your payment was declined. Let's fix this:\n1. Verify your card hasn't expired\n2. Check if you have sufficient funds\n3. Ensure billing address matches\n4. Try a different payment method\nWhich would you like to check first?",
      
      price_increase: "Regarding the price change:\n1. We occasionally adjust prices to improve service\n2. You'll always be notified in advance\n3. You can review different plan options\n4. Cancel anytime if unsatisfied\nWould you like to review our current plans?",
      
      extra_charges: "Let me explain any extra charges:\n1. Tax rates vary by location\n2. Premium features may have additional costs\n3. Plan upgrades can affect billing\n4. I can review specific charges\nWhich charge would you like me to explain?",
      
      payment_history: "I can help you access your payment history:\n1. Go to Account Settings\n2. View Billing History\n3. Download billing statements\n4. Review past transactions\nWould you like me to guide you through this?",
      
      free_trial: {
        initial: "About our free trial:\n1. Available for new members only\n2. Requires valid payment method\n3. Cancel anytime during trial\n4. Full access to all features\nWhat would you like to know more about?",
        followUpOptions: [
          { text: "How to start free trial?", action: "start_trial" },
          { text: "When will I be charged?", action: "trial_billing" },
          { text: "How to cancel trial?", action: "cancel_trial" },
          { text: "Trial limitations?", action: "trial_limits" }
        ],
        responses: {
          start_trial: "To start your free trial:\n1. Visit netflix.com/signup\n2. Choose your plan\n3. Create account\n4. Add payment method\nWould you like help with any of these steps?",
          trial_billing: "About trial billing:\n1. No charge during trial period\n2. First charge after trial ends\n3. We'll remind you 3 days before\n4. Cancel anytime to avoid charges\nNeed help setting a reminder?",
          cancel_trial: "To cancel your trial:\n1. Go to Account\n2. Select Cancel Membership\n3. Confirm cancellation\n4. Keep watching until trial ends\nWould you like me to guide you through this?",
          trial_limits: "Trial information:\n1. Full access to all content\n2. All features available\n3. One trial per household\n4. 30-day duration\nAny specific feature you'd like to know more about?"
        }
      }
    }
  },
  streaming: {
    title: "Streaming Issues Support",
    quickReplies: [
      { text: "Buffering problems", action: "buffering" },
      { text: "Poor video quality", action: "quality" },
      { text: "Audio sync issues", action: "audio" },
      { text: "App keeps crashing", action: "crash" },
      { text: "Error codes", action: "error" }
    ],
    responses: {
      buffering: "Let's fix those buffering issues. Could you tell me: 1. What device you're using? 2. Your internet speed (check at fast.com) 3. If other streaming services work fine?",
      quality: "To improve video quality, let's check: 1. Your internet speed 2. Your Netflix plan (HD/4K availability) 3. Your device settings. Which would you like to check first?",
      audio: "For audio sync issues: 1. Try restarting the show/movie 2. Check if it happens on all content 3. Clear app cache 4. Update the app. Shall we try these steps?",
      crash: "To fix app crashes: 1. Update the app 2. Clear cache 3. Restart device 4. Reinstall if needed. What's your device type so I can provide specific steps?",
      error: "Could you share the error code you're seeing? This will help me provide the exact steps to resolve it."
    }
  },
  account: {
    title: "Account Management Support",
    quickReplies: [
      { text: "Reset password", action: "reset_pass" },
      { text: "Add/remove profile", action: "profile" },
      { text: "Change email", action: "change_email" },
      { text: "Account hacked", action: "security" },
      { text: "Parental controls", action: "parental" }
    ],
    responses: {
      reset_pass: "To reset your password: 1. Visit netflix.com/loginhelp 2. Enter your email 3. Choose email/text verification 4. Follow the reset link. Need help with any of these steps?",
      profile: "I can help you manage profiles. Would you like to: 1. Create a new profile 2. Delete a profile 3. Set up a kids profile 4. Modify profile settings?",
      change_email: "To change your email: 1. Sign in to Netflix 2. Go to Account 3. Change Email. For security, you'll need to verify your identity. Would you like to proceed?",
      security: "If you suspect account compromise: 1. Change password immediately 2. Sign out all devices 3. Check recent activity 4. Enable 2FA. Shall we start with changing your password?",
      parental: "For parental controls: 1. Set maturity ratings 2. Create kids profiles 3. Set viewing restrictions 4. PIN protect profiles. Which would you like to set up?"
    }
  },
  general: {
    title: "General Support",
    quickReplies: [
      { text: "Download shows", action: "download" },
      { text: "Device compatibility", action: "devices" },
      { text: "Netflix plans", action: "plans" },
      { text: "Content availability", action: "content" },
      { text: "Technical issues", action: "tech" }
    ],
    responses: {
      download: "To download content: 1. Open Netflix app 2. Find your show/movie 3. Tap download icon. Note: Not all titles are available for download. Would you like to know which devices support downloads?",
      devices: "Netflix works on: Smart TVs, Game consoles, Streaming devices, Mobile devices, Computers. Which device would you like specific information about?",
      plans: "Netflix offers Basic, Standard, and Premium plans. Would you like to: 1. Compare plan features 2. Check pricing 3. Learn about HD/4K availability 4. Upgrade your plan?",
      content: "Content varies by region and licensing agreements. I can help you: 1. Find specific titles 2. Check upcoming releases 3. Get recommendations 4. Use VPN-free alternatives",
      tech: "Let's troubleshoot your technical issue. Could you describe what's happening? Common issues include: Login problems, Playback errors, Device connectivity, App issues"
    }
  }
}; 