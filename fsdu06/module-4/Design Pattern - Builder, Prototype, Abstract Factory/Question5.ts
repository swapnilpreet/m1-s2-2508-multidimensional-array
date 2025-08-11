
interface Device{
    specifications():void;
}


class AppleLaptop implements Device{
    specifications(): void {
        console.log('apple laptop: macbook pro m 216gb  512Gb')
    }
}

class ApplePhone implements Device{
    specifications(): void {
        console.log("Apple phone iphone 16pro max 128gb A17 chip")
    }
}

class SamsungLaptop implements Device{
    specifications(): void {
        console.log("Samsung laptop galxy book 3 16gb 1tb ssd")
    }
}

class SamsungPhone implements Device{
    specifications(): void {
        console.log("Samsung phone :galaxy s24 ultra 256 Gb snapdragon")
    }
}



interface DeviceFactory{
    createDevice(type:string):Device;
}


class AppleFactory implements DeviceFactory{
    createDevice(type: string): Device {
        if(type==='Laptop'){
            return new AppleLaptop();
        }else if(type==="phone"){
            return new ApplePhone();
        }
        throw new Error("Unknown Apple device type")
    }
}


class SamsungFactory implements DeviceFactory{
    createDevice(type: string): Device {
        if(type==='Laptop'){
            return new SamsungLaptop();
        }else if(type==="Phone"){
            return new SamsungPhone();
        }

        throw new Error("Unknown Sumsung device type")
    }
}



function main5():void{
    let applefactory:DeviceFactory=new AppleFactory();
    let applelaptop=applefactory.createDevice("Laptop");
    applelaptop.specifications();

    const samsungfactory:DeviceFactory=new SamsungFactory();
    let samsungPhone=samsungfactory.createDevice("Phone");
    samsungPhone.specifications();
}

main5();