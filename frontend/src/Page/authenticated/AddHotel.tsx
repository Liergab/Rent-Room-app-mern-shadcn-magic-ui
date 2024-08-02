import ManageHotelForms  from "@/components/forms/ManageHotelForms"
import { useCreateRoom } from "@/services/api/Room"
import { useMutation, useQueryClient }   from "@tanstack/react-query"
import toast             from "react-hot-toast"
import { useNavigate } from "react-router-dom"


const AddHotel = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const createRoom = useMutation({
    mutationFn:useCreateRoom,
    onSuccess:()=> {
      queryClient.invalidateQueries({queryKey:['getAllRoomByOwner']})
      toast.success('Room Added!')
      navigate('/my-hotel')
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