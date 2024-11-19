interface TransferOption {
    option: string;
    charge: number;
  }
  
  interface PackageType {
    id: number;
    name: string;
    charges: number;
    transferOptions: TransferOption[];
  }
  
  interface BasePrice {
    adult: number;
    child: number;
    infant: number;
  }
  
  export interface activityInfo {
    activityId: number;
    name: string;
    location: string;
    tag: string;
    noOfReviews: number;
    noOfHours: number;
    basePrice: BasePrice;
    images: string[];
    packagetype: PackageType[];
    rating: number;
  }
  