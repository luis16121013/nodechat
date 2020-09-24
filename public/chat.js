const socket = io();

const renderMSG =(username,msg)=>{
    chat.innerHTML+=`
        <div class="m-1 border bg-primary" style="border-radius:15px;">
            <p class="text-white pl-2"><span class="dot"></span><strong>[ ${username} ]</strong><br>
                ${msg}
            </p>
        </div>
    `;
}

socket.on('connect',()=>{
    console.log('this user connect');
});
socket.on('disconnected',({data})=>{
    console.log(`user [ ${data} ] -> disconected`);
});
socket.on('renderMessage',({username,msg})=>{
    renderMSG(username,msg);
});

const btn = document.querySelector('#send');
btn.addEventListener('click',(e)=>{
    e.preventDefault();
    const data = {
        username: username.value,
        msg: msg.value
    }
    socket.emit('sendMSG',data);
});

