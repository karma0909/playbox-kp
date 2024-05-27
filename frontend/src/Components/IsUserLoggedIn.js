async function IsUserLoggedIn()
{ 
      const responseIsLoggedIn = await fetch('/isLoggedIn', {
        method: "POST",
        headers: {
          "Content-Type": 'application/json'
        },
      })
      const isLoggedIn = await responseIsLoggedIn
      const data = await isLoggedIn.json();
      return data
}


export default IsUserLoggedIn