import React               from 'react';
import { useFormContext }  from 'react-hook-form';
import { HotelFormData }   from '../ManageHotelForms';

const ImageFormSection: React.FC = () => {
  const { register, formState: { errors } } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className='text-2xl font-bold mb-3 z-50'>Image</h2>
      <div className='border rounded p-4 flex-col flex gap-4  border-bleached-cedar-500  dark:bg-bleached-cedar-100'>
        <input
          type="file"
          multiple
          accept='image/*'
          {...register("imageFiles")}
          className='w-full text-gray-700 font-normal'
        />
      </div>
      <p className='text-red-400'>{errors.imageFiles?.message}</p>
    </div>
  );
};

export default ImageFormSection;
