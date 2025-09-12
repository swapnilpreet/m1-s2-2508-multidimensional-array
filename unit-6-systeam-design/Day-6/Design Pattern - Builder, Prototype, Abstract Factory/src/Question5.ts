interface Device {
  specifications(): void;
}


class AppleLaptop implements Device {
  specifications(): void {
    console.log("Apple Laptop: MacBook Pro with M2 Chip, 16GB RAM, 512GB SSD");
  }
}
class ApplePhone implements Device {
  specifications(): void {
    console.log("Apple Phone: iPhone 14 Pro, A16 Bionic, 6.1-inch OLED");
  }
}



class SamsungLaptop implements Device {
  specifications(): void {
    console.log("Samsung Laptop: Galaxy Book3, Intel i7, 16GB RAM, 1TB SSD");
  }
}
class SamsungPhone implements Device {
  specifications(): void {
    console.log("Samsung Phone: Galaxy S23 Ultra, Snapdragon 8 Gen 2, 6.8-inch AMOLED");
  }
}

interface DeviceFactory {
  createDevice(type: string): Device;
}
class AppleFactory implements DeviceFactory {
  createDevice(type: string): Device {
    if (type === "laptop") return new AppleLaptop();
    if (type === "phone") return new ApplePhone();
    throw new Error("Unknown Apple device type");
  }
}
class SamsungFactory implements DeviceFactory {
  createDevice(type: string): Device {
    if (type === "laptop") return new SamsungLaptop();
    if (type === "phone") return new SamsungPhone();
    throw new Error("Unknown Samsung device type");
  }
}
function main5() {
  const appleFactory: DeviceFactory = new AppleFactory();
  const samsungFactory: DeviceFactory = new SamsungFactory();
  const appleLaptop = appleFactory.createDevice("laptop");
  const samsungPhone = samsungFactory.createDevice("phone");
  appleLaptop.specifications();
  samsungPhone.specifications();
}
main5();
