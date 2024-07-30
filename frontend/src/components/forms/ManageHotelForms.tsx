import { hotelFormDataSchema } from "@/Schemas/FormSchema"
import { FormProvider, useForm } from "react-hook-form";
import DetailsFormSection from "./DetailsFormSection";
import { zodResolver } from "@hookform/resolvers/zod";
import TypesFormSection from "./TypesFormSection";
import FacilitiesFormSection from "./FacilitiesFormSection";
import GuestsSection from "./GuestsSection";
import { Button } from "../ui/button";
import useMetaTags from "@/hooks/useMetaTags";
import ImageFormSection from "./ImageFormSection";



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
  useMetaTags('Add-Room', 'Adding Room For Client')
  const formMethods = useForm<HotelFormData>({
    resolver:zodResolver(hotelFormDataSchema)
  });

  const onSubmit = (value:HotelFormData) => {
    console.log(value)
    console.log(value.imageFiles);
  }

  return (
   <FormProvider {...formMethods}>
    <form onSubmit={formMethods.handleSubmit(onSubmit)} className="flex flex-col gap-10">
      <DetailsFormSection/>
      <TypesFormSection/>
      <FacilitiesFormSection/>
      <GuestsSection/>
      <ImageFormSection/>
      <Button type="submit" > submit</Button>
    </form>
   </FormProvider>
  )
}

export default ManageHotelForms