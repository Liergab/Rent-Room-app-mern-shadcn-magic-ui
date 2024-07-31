import ManageHotelForms  from "@/components/forms/ManageHotelForms"
import { useCreateRoom } from "@/services/api/Room"
import { useMutation }   from "@tanstack/react-query"
import toast             from "react-hot-toast"


const AddHotel = () => {
  const createRoom = useMutation({
    mutationFn:useCreateRoom,
    onSuccess:()=> {
      toast.success('Room Added!')
    },
    onError:(error)=>{
      console.log(error)
    }
  })

  const handleSave = async(hotelFormData:FormData) => {
    await createRoom.mutateAsync(hotelFormData)
  }
  return (
    <div className="container">
        <ManageHotelForms onSave={handleSave} isLoading={createRoom.isPending}/>
    </div>
  )
}

export default AddHotel