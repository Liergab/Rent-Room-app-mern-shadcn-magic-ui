import React, { useEffect }      from "react";
import { hotelFormDataSchema }   from "@/Schemas/FormSchema"
import { FormProvider, useForm } from "react-hook-form";
import DetailsFormSection        from "./AddRoomHotelSection/DetailsFormSection";
import { zodResolver }           from "@hookform/resolvers/zod";
import TypesFormSection          from "./AddRoomHotelSection/TypesFormSection";
import FacilitiesFormSection     from "./AddRoomHotelSection/FacilitiesFormSection";
import GuestsSection             from "./AddRoomHotelSection/GuestsSection";
import { Button }                from "../ui/button";
import useMetaTags               from "@/hooks/useMetaTags";
import ImageFormSection          from "./AddRoomHotelSection/ImageFormSection";



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

type props = {
  onSave :(hotelFormData:FormData) => void;
  isLoading: boolean;
}

const ManageHotelForms:React.FC<props> = ({onSave,isLoading}) => {
  useMetaTags('Add-Room', 'Adding Room For Client')
  const formMethods = useForm<HotelFormData>({
    resolver:zodResolver(hotelFormDataSchema)
  });

  const onSubmit = (value:HotelFormData) => {
    const formData = new FormData();
    formData.append("name", value.name);
    formData.append("city", value.city);
    formData.append("country", value.country);
    formData.append("description", value.description);
    formData.append("type", value.type);
    formData.append("pricePerNight", value.pricePerNight.toString());
    formData.append("starRating", value.starRating.toString());
    formData.append("adultCount", value.adultCount.toString());
    formData.append("childCount", value.childCount.toString());
    value.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]` ,facility)
    })
    Array.from(value.imageFiles).forEach((imageFile) => {
        formData.append(`imageFiles`, imageFile)
    })
   
    onSave(formData)
   
  }

  useEffect(() => {
    if(formMethods.formState.isSubmitSuccessful){
      formMethods.reset()
    }
  },[formMethods.formState, formMethods.formState.isSubmitSuccessful, formMethods.reset, formMethods])

  return (
   <FormProvider {...formMethods}>
    <form onSubmit={formMethods.handleSubmit(onSubmit)} className="flex flex-col gap-10 ">
      <DetailsFormSection/>
      <TypesFormSection/>
      <FacilitiesFormSection/>
      <GuestsSection/>
      <ImageFormSection/>
      <Button disabled={isLoading} type="submit" >{isLoading ? 'Submmiting' :' submit'}</Button>
    </form>
   </FormProvider>
  )
}

export default ManageHotelForms