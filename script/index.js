document.getElementById('btn-signup').addEventListener('click',function(){
    const userName=document.getElementById('user-name').value;
    const passWord=document.getElementById('password').value
    if(userName==='admin' && passWord==='admin123'){
        window.location.replace('/home.html')
    }else{
        alert('User name and password is not correct');
        return;
    }
})