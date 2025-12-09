import { ref, computed } from 'vue'

export function useChat() {
  const messages = ref([])
  const isLoading = ref(false)
  const error = ref(null)
  const currentChat = ref(null)

  // Mock message data
  const mockMessages = [
    {
      id: 1,
      sender: 'doctor',
      senderName: 'Dr. Sarah Kipchoge',
      senderAvatar: '👩‍⚕️',
      content: 'Hello! How can I help you today?',
      timestamp: new Date(Date.now() - 3600000),
      isRead: true
    },
    {
      id: 2,
      sender: 'patient',
      senderName: 'You',
      senderAvatar: '👤',
      content: 'I have been having persistent headaches for a week now',
      timestamp: new Date(Date.now() - 3000000),
      isRead: true
    },
    {
      id: 3,
      sender: 'doctor',
      senderName: 'Dr. Sarah Kipchoge',
      senderAvatar: '👩‍⚕️',
      content: 'I see. Can you describe the type of pain? Is it sharp, throbbing, or dull?',
      timestamp: new Date(Date.now() - 2400000),
      isRead: true
    },
    {
      id: 4,
      sender: 'patient',
      senderName: 'You',
      senderAvatar: '👤',
      content: 'It feels like a dull pressure, mostly on the sides of my head',
      timestamp: new Date(Date.now() - 1800000),
      isRead: true
    }
  ]

  // Initialize messages
  const initializeChat = (doctorId = null) => {
    isLoading.value = true
    error.value = null
    
    try {
      currentChat.value = doctorId
      messages.value = [...mockMessages]
      isLoading.value = false
    } catch (err) {
      error.value = err.message
      isLoading.value = false
    }
  }

  // Send message
  const sendMessage = async (content, senderId = 'patient') => {
    if (!content.trim()) {
      return false
    }

    try {
      const newMessage = {
        id: messages.value.length + 1,
        sender: senderId,
        senderName: senderId === 'patient' ? 'You' : 'Dr. Sarah Kipchoge',
        senderAvatar: senderId === 'patient' ? '👤' : '👩‍⚕️',
        content: content.trim(),
        timestamp: new Date(),
        isRead: senderId === 'patient' ? true : false
      }

      messages.value.push(newMessage)

      // Simulate doctor response after 1 second
      if (senderId === 'patient') {
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const doctorResponse = {
          id: messages.value.length + 1,
          sender: 'doctor',
          senderName: 'Dr. Sarah Kipchoge',
          senderAvatar: '👩‍⚕️',
          content: generateDoctorResponse(content),
          timestamp: new Date(),
          isRead: false
        }
        
        messages.value.push(doctorResponse)
      }

      return true
    } catch (err) {
      error.value = err.message
      return false
    }
  }

  // Mark message as read
  const markAsRead = (messageId) => {
    const message = messages.value.find(m => m.id === messageId)
    if (message) {
      message.isRead = true
    }
  }

  // Mark all as read
  const markAllAsRead = () => {
    messages.value.forEach(msg => {
      msg.isRead = true
    })
  }

  // Get unread count
  const unreadCount = computed(() => {
    return messages.value.filter(m => !m.isRead && m.sender === 'doctor').length
  })

  // Get last message
  const lastMessage = computed(() => {
    return messages.value[messages.value.length - 1] || null
  })

  // Clear messages
  const clearMessages = () => {
    messages.value = []
    currentChat.value = null
    error.value = null
  }

  // Generate mock doctor response
  const generateDoctorResponse = (userMessage) => {
    const responses = [
      'Thank you for that information. Let me think about this...',
      'That\'s helpful. Do you have any other symptoms?',
      'I understand. Let me prescribe something that might help.',
      'That sounds like it could be tension headaches. Have you been stressed?',
      'I\'d like to run some tests. Can you come in next week?',
      'This is important. Please follow up with me in a few days.',
      'Based on what you\'ve told me, I think we should try a different approach.',
      'That\'s good to know. Keep monitoring and report any changes.'
    ]
    
    return responses[Math.floor(Math.random() * responses.length)]
  }

  return {
    messages,
    isLoading,
    error,
    currentChat,
    unreadCount,
    lastMessage,
    initializeChat,
    sendMessage,
    markAsRead,
    markAllAsRead,
    clearMessages
  }
}