import React               from 'react';
import { useFormContext }  from 'react-hook-form';
import { HotelFormData }   from '../ManageHotelForms';

const ImageFormSection: React.FC = () => {
  const { register,watch, setValue, formState: { errors } } = useFormContext<HotelFormData>();
  const existingImageUrls = watch("imageUrls")
  console.log(existingImageUrls)
  const handleDelete = (event:React.MouseEvent<HTMLButtonElement,MouseEvent>, imageUrl:string) => {
      event.preventDefault();
     setValue('imageUrls', existingImageUrls.filter((url) => url !== imageUrl))

  }

  return (
    <div>
      <h2 className='text-2xl font-bold mb-3 z-50'>Image</h2>
      <div className='border rounded p-4 flex-col flex gap-4  border-bleached-cedar-500  dark:bg-bleached-cedar-100'>
        {existingImageUrls && (
          <div className='grid grid-cols-6 gap-4'>
            {existingImageUrls.map((url) =>(
              <div className='relative group' key={url}>
                <img src={url} alt=""  className='min-h-full object-cover'/>
                <button 
                  onClick={(event)=> handleDelete(event, url)}
                  className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white'>Delete</button>
              </div>
            ))}
          </div>
        )}
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
