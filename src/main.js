// Initialize Firebase
var config = {
  apiKey: 'AIzaSyAgc6G7YZUlgZ8E2YNRKh5D-aj3Mdb9MwM',
  authDomain: 'chat-d7bf5.firebaseapp.com',
  databaseURL: 'https://chat-d7bf5.firebaseio.com',
  projectId: 'chat-d7bf5',
  storageBucket: '',
  messagingSenderId: '162364185441'
}
firebase.initializeApp(config)

var db = firebase.database()
var chatsRef = db.ref('/chats')
var sessionId = Math.floor(Math.random() * 1001)
var chatForm = document.querySelector('form')
var textBox = document.querySelector('input')
var messages = document.querySelector('ul')
var scroll = document.scrollingElement || document.body

chatForm.addEventListener('submit', handleSubmit)

function handleSubmit(e) {
  e.preventDefault()

  if (!textBox.value) {
    return
  }

  const messageId = Date.now()

  db.ref('chats/' + messageId).set({
    userId: sessionId,
    message: textBox.value
  })

  textBox.value = ''
}

chatsRef.on('child_added', handleChildAdded)

function handleChildAdded(data) {
  const messageData = data.val()
  const li = document.createElement('li')

  li.innerHTML = emoji[messageData.userId] + ' ' + messageData.message

  if (messageData.userId !== sessionId) {
    li.classList.add('other')
  }

  messages.appendChild(li)
  scroll.scrollTop = scroll.scrollHeight
}
