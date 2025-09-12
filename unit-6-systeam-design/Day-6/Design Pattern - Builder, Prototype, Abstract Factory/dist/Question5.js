"use strict";
class AppleLaptop {
    specifications() {
        console.log("Apple Laptop: MacBook Pro with M2 Chip, 16GB RAM, 512GB SSD");
    }
}
class ApplePhone {
    specifications() {
        console.log("Apple Phone: iPhone 14 Pro, A16 Bionic, 6.1-inch OLED");
    }
}
class SamsungLaptop {
    specifications() {
        console.log("Samsung Laptop: Galaxy Book3, Intel i7, 16GB RAM, 1TB SSD");
    }
}
class SamsungPhone {
    specifications() {
        console.log("Samsung Phone: Galaxy S23 Ultra, Snapdragon 8 Gen 2, 6.8-inch AMOLED");
    }
}
class AppleFactory {
    createDevice(type) {
        if (type === "laptop")
            return new AppleLaptop();
        if (type === "phone")
            return new ApplePhone();
        throw new Error("Unknown Apple device type");
    }
}
class SamsungFactory {
    createDevice(type) {
        if (type === "laptop")
            return new SamsungLaptop();
        if (type === "phone")
            return new SamsungPhone();
        throw new Error("Unknown Samsung device type");
    }
}
function main5() {
    const appleFactory = new AppleFactory();
    const samsungFactory = new SamsungFactory();
    const appleLaptop = appleFactory.createDevice("laptop");
    const samsungPhone = samsungFactory.createDevice("phone");
    appleLaptop.specifications();
    samsungPhone.specifications();
}
main5();
