import { wrap } from "module";

const submitBtn = document.getElementById("submit"),
      formContent= document.getElementById("content"),
      backArrow = document.getElementById("back"),
      form = document.getElementById("form") as HTMLFormElement,
      nameForm: HTMLInputElement | null = document.querySelector("input[name='oleg']"),
      surname: HTMLInputElement | null = document.querySelector("input[name='surname']"),
      email: HTMLInputElement | null = document.querySelector("input[name='email']"),
      password: HTMLInputElement | null = document.querySelector("input[name='password']"),
      stepSpan = document.getElementById("step"),
      notifications = document.getElementById("notifications") as HTMLDivElement;


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
        const serverResponse = await fetchServer();
        console.log(serverResponse);
        (serverResponse.status === 200) ? createNotification(serverResponse, true) : createNotification(serverResponse, false);
                
        
    }
});

async function  fetchServer() {
    const f =  await fetch("http://localhost:5678/user", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({name: nameForm?.value, surname: surname?.value, email: email?.value, password: password?.value})
        });
    const res =  await f.json(),
          status = f.status;
    return {
        status,
        res
    }
}


const notificationWrapClasses = ["w-full","rounded", "flex", "jistify-start", "flex-col", "gap-2", "bg-white", "shadow-md", "py-[10px]", "min-h-[49px]", "relative", "overflow-hidden"],
      notificationHeaderWrapClasses = ["border-b", "border-b-[#EEEEEE]", "px-[15px]", "pb-[5px]"],
      notificationParagraphClasses = ["text-sm", "px-[15px]"],
      successHeaderClasses = ["text-emerald-300", "text-md"],
      failureHeaderClasses = ["text-red-300", "text-md"];

const cross = `<svg xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                class="absolute right-[15px] top-[13.5px] cursor-pointer"
                width="15px"
                onclick="this.parentNode.remove()"
                >
                <path
                    d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
            </svg>`;

function createNotification(res: {status: number, res: any}, succes: boolean) {
    const wrap = document.createElement("div"),
          headerWrap = document.createElement("div"),
          header = document.createElement("h4"),
          paragraph = document.createElement("p");
    
    const headerClasses = (succes) ? successHeaderClasses : failureHeaderClasses,
          headerText = (succes) ? "Успех!" : "Не вышло D:";

    wrap.classList.add(...notificationWrapClasses);
    headerWrap.classList.add(...notificationHeaderWrapClasses);
    header.classList.add(...headerClasses);
    paragraph.classList.add(...notificationParagraphClasses);

    header.textContent = headerText;
    paragraph!.textContent = res.res.response;

    headerWrap.append(header);
    wrap.append(headerWrap, paragraph);
    wrap.innerHTML += cross;

    notifications.append(wrap);
}


export {}