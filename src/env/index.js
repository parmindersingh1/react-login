const __env = __env || {};

let environment = "dev"; // can be dev, test or prod.

__env.name = environment;
// environment specific constants
if (environment === "prod") {
  __env.defaultImg = "https://s3.ap-south-1.amazonaws.com/ordertick/default/";
  __env.imageBaseUrl = "https://s3.ap-south-1.amazonaws.com/ordertick/100/";
  __env.imageBaseUrlXs = "https://s3.ap-south-1.amazonaws.com/ordertick/150/";
  __env.prescriptions = "https://s3.ap-south-1.amazonaws.com/ordertick-upload/";
  __env.storeScheduleExcel =
    "https://s3.ap-south-1.amazonaws.com/ordertick/default/StoresRoutes_Excels/Distributor_SampleExcel.xlsx";
  __env.manustoreScheduleExcel =
    "https://s3.ap-south-1.amazonaws.com/ordertick/Stores_Routes_Excel/ManufacturerRoutes.xlsx";
  __env.productScheduleExcel =
    "https://s3.ap-south-1.amazonaws.com/ordertick/Products+Excel/sampleProducts.csv";

  __env.dataApi = "http://www.ordertick.com/data";
} else if (environment === "qa") {
  __env.defaultImg = "https://s3.amazonaws.com/osasnv/default/";
  __env.imageBaseUrl = "https://s3.amazonaws.com/osasnv/100/";
  __env.imageBaseUrlXs = "https://s3.amazonaws.com/osasnv/150/";
  __env.prescriptions = "https://s3.amazonaws.com/osasnv-upload/";
  __env.storeScheduleExcel =
    "https://s3.amazonaws.com/osasnv/default/StoresRoutes_Excels/Distributor_SampleExcel.xlsx";
  __env.manustoreScheduleExcel =
    "https://s3.amazonaws.com/osasnv/Stores_Routes_Excel/ManufacturerRoutes.xlsx";
  __env.productScheduleExcel =
    "https://s3.amazonaws.com/osasnv/Products+Excel/sampleProducts.csv";
  __env.dataApi = "/";
  __env.googleMap = "https://www.google.com/maps/search/?api=1&query=";
  __env.showSidebarStoreOwner = true;


} else {
  // DEFAULT - assume dev

  __env.defaultImg = "https://s3.amazonaws.com/osasnv/default/";
  __env.imageBaseUrl = "https://s3.amazonaws.com/osasnv/100/";
  __env.imageBaseUrlXs = "https://s3.amazonaws.com/osasnv/150/";
  __env.prescriptions = "https://s3.amazonaws.com/osasnv-upload/";
  __env.storeScheduleExcel =
    "https://s3.amazonaws.com/osasnv/default/StoresRoutes_Excels/Distributor_SampleExcel.xlsx";
  __env.manustoreScheduleExcel =
    "https://s3.amazonaws.com/osasnv/Stores_Routes_Excel/ManufacturerRoutes.xlsx";
  __env.productScheduleExcel =
    "https://s3.amazonaws.com/osasnv/Products+Excel/sampleProducts.csv";
  __env.dataApi = "http://192.168.1.5:8080";
  __env.user = "9000000000";
  __env.password = "password";
  __env.googleMap = "https://www.google.com/maps/search/?api=1&query=";
  __env.showSidebarStoreOwner = true;


}

export default __env;