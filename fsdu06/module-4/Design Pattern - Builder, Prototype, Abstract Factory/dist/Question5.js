"use strict";
class AppleLaptop {
    specifications() {
        console.log('apple laptop: macbook pro m 216gb  512Gb');
    }
}
class ApplePhone {
    specifications() {
        console.log("Apple phone iphone 16pro max 128gb A17 chip");
    }
}
class SamsungLaptop {
    specifications() {
        console.log("Samsung laptop galxy book 3 16gb 1tb ssd");
    }
}
class SamsungPhone {
    specifications() {
        console.log("Samsung phone :galaxy s24 ultra 256 Gb snapdragon");
    }
}
class AppleFactory {
    createDevice(type) {
        if (type === 'Laptop') {
            return new AppleLaptop();
        }
        else if (type === "Phone") {
            return new ApplePhone();
        }
        throw new Error("Unknown Apple device type");
    }
}
class SamsungFactory {
    createDevice(type) {
        if (type === 'Laptop') {
            return new SamsungLaptop();
        }
        else if (type === "Phone") {
            return new SamsungPhone();
        }
        throw new Error("Unknown Sumsung device type");
    }
}
function main5() {
    let applefactory = new AppleFactory();
    let applelaptop = applefactory.createDevice("Laptop");
    applelaptop.specifications();
    const samsungfactory = new SamsungFactory();
    let samsungPhone = samsungfactory.createDevice("Phone");
    samsungPhone.specifications();
}
main5();
