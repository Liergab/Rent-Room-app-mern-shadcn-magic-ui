import { hotelFormDataSchema } from "@/Schemas/FormSchema"
import { FormProvider, useForm } from "react-hook-form";
import DetailsFormSection from "./DetailsFormSection";
import { zodResolver } from "@hookform/resolvers/zod";



export type HotelFormData = {
  name : string;
  city : string;
  country:string;
  description:string;
  type:string;
  pricePerNight:number;
  starRating:number;
  facilities:string[];
  imageFiles: FileList;
  adultCount:number;
  childCount:number;
}

const ManageHotelForms = () => {

  const formMethods = useForm<HotelFormData>({
    resolver:zodResolver(hotelFormDataSchema)
  });

  return (
   <FormProvider {...formMethods}>
    <form action="">
      <DetailsFormSection/>
    </form>
   </FormProvider>
  )
}

export default ManageHotelForms