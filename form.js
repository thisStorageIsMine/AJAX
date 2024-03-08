"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// Object.defineProperty(exports, "__esModule", { value: true });
var submitBtn = document.getElementById("submit"), formContent = document.getElementById("content"), backArrow = document.getElementById("back"), form = document.getElementById("form"), nameForm = document.querySelector("input[name='oleg']"), surname = document.querySelector("input[name='surname']"), email = document.querySelector("input[name='email']"), password = document.querySelector("input[name='password']"), stepSpan = document.getElementById("step"), notifications = document.getElementById("notifications");
backArrow === null || backArrow === void 0 ? void 0 : backArrow.addEventListener("click", function () {
    formContent.style.transform = "";
    backArrow.style.display = "";
    submitBtn.dataset.step = stepSpan.textContent = "1";
});
submitBtn === null || submitBtn === void 0 ? void 0 : submitBtn.addEventListener("click", function (e) { return __awaiter(void 0, void 0, void 0, function () {
    var serverResponse;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(submitBtn.dataset.step === "1")) return [3 /*break*/, 1];
                formContent.style.transform = "translateX(-100%)";
                backArrow.style.display = "block";
                submitBtn.dataset.step = stepSpan.textContent = "2";
                return [3 /*break*/, 3];
            case 1: return [4 /*yield*/, fetchServer()];
            case 2:
                serverResponse = _a.sent();
                console.log(serverResponse);
                (serverResponse.status === 200) ? createNotification(serverResponse, true) : createNotification(serverResponse, false);
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
function fetchServer() {
    return __awaiter(this, void 0, void 0, function () {
        var f, res, status;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:5678/user", {
                        method: "POST",
                        headers: { "Content-type": "application/json" },
                        body: JSON.stringify({ name: nameForm === null || nameForm === void 0 ? void 0 : nameForm.value, surname: surname === null || surname === void 0 ? void 0 : surname.value, email: email === null || email === void 0 ? void 0 : email.value, password: password === null || password === void 0 ? void 0 : password.value })
                    })];
                case 1:
                    f = _a.sent();
                    return [4 /*yield*/, f.json()];
                case 2:
                    res = _a.sent(), status = f.status;
                    return [2 /*return*/, {
                            status: status,
                            res: res
                        }];
            }
        });
    });
}
var notificationWrapClasses = ["w-full", "rounded", "flex", "jistify-start", "flex-col", "gap-2", "bg-white", "shadow-md", "py-[10px]", "min-h-[49px]", "relative", "overflow-hidden"], notificationHeaderWrapClasses = ["border-b", "border-b-[#EEEEEE]", "px-[15px]", "pb-[5px]"], notificationParagraphClasses = ["text-sm", "px-[15px]"], successHeaderClasses = ["text-emerald-300", "text-md"], failureHeaderClasses = ["text-red-300", "text-md"];
var cross = "<svg xmlns=\"http://www.w3.org/2000/svg\"\n                viewBox=\"0 0 384 512\"\n                class=\"absolute right-[15px] top-[13.5px] cursor-pointer\"\n                width=\"15px\"\n                onclick=\"this.parentNode.remove()\"\n                >\n                <path\n                    d=\"M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z\" />\n            </svg>";
function createNotification(res, succes) {
    var _a, _b, _c, _d;
    var wrap = document.createElement("div"), headerWrap = document.createElement("div"), header = document.createElement("h4"), paragraph = document.createElement("p");
    var headerClasses = (succes) ? successHeaderClasses : failureHeaderClasses, headerText = (succes) ? "Успех!" : "Не вышло D:";
    (_a = wrap.classList).add.apply(_a, notificationWrapClasses);
    (_b = headerWrap.classList).add.apply(_b, notificationHeaderWrapClasses);
    (_c = header.classList).add.apply(_c, headerClasses);
    (_d = paragraph.classList).add.apply(_d, notificationParagraphClasses);
    header.textContent = headerText;
    paragraph.textContent = res.res.response;
    headerWrap.append(header);
    wrap.append(headerWrap, paragraph);
    wrap.innerHTML += cross;
    notifications.append(wrap);
}
