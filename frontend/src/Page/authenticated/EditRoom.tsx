import ManageHotelForms from '@/components/forms/ManageHotelForms'
import { useGetRoomById, useUpdateRoom } from '@/services/api/Room'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'


const EditRoom = () => {
  const { id } = useParams() 
  const { data: hotel, isLoading } = useGetRoomById(id!)
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const updateRoom = useMutation({
    mutationFn: useUpdateRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllRoomByOwner'] })
      toast.success('Room Updated!')
      navigate('/my-hotel')
    }
  })

  if(isLoading || updateRoom.isPending) return 

  const handleSave = async (hotelFormData: FormData) => {
  
      await updateRoom.mutateAsync(hotelFormData)
    
  }

  return (
    <div className='container'>
      {isLoading ?
        <h1>Loading</h1>
        :
        <>
          <ManageHotelForms hotel={hotel} onSave={handleSave} isLoading={updateRoom.isPending}/>
        </>
      }
    </div>
  )
}

export default EditRoom