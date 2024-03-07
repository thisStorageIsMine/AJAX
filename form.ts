const submitBtn = document.getElementById("submit"),
      formContent= document.getElementById("content"),
      backArrow = document.getElementById("back"),
      form = document.getElementById("form") as HTMLFormElement,
      nameForm: HTMLInputElement | null = document.querySelector("input[name='oleg']"),
      surname: HTMLInputElement | null = document.querySelector("input[name='surname']"),
      email: HTMLInputElement | null = document.querySelector("input[name='email']"),
      password: HTMLInputElement | null = document.querySelector("input[name='password']"),
      stepSpan = document.getElementById("step");


backArrow?.addEventListener("click", () => {
    formContent!.style.transform = "";
    backArrow!.style.display = "";
    submitBtn!.dataset.step = stepSpan!.textContent = "1";
})



submitBtn?.addEventListener("click", async (e: Event) => {

    if(submitBtn!.dataset.step === "1") {
        formContent!.style.transform = "translateX(-100%)";
        backArrow!.style.display = "block";
        submitBtn!.dataset.step = stepSpan!.textContent = "2";

    } else {
        fetchUser();
                
        
    }
});

 function  fetchUser() {
    const req =  fetch("http://localhost:5678/user", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({name: nameForm?.value, surname: surname?.value, email: email?.value, password: password?.value})
        })
         .then(data => {
            data.json()
                .then(j => console.log(j))
         });

}

export {}