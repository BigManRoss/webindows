import App from "./AppObj";

export default function getAllApps() {
    let arrApps = new Array(0);
    let obj = {};

    obj = new App(
        "Order Manager",
        `Apps/App_OrderManagerHTML.html`,
        "ImgTrans_OrderManager.png"
    );
    arrApps.push(obj);

    obj = new App(
        "Callback Sorter",
        `Apps/App_CallbackSorterHTML.html`,
        "Img_Program.PNG"
    );

    arrApps.push(obj);

    return arrApps;
}