import { useAuthStore } from "@store/GymUserStore"
import { useNavigate } from "react-router"



export const useAuthForm = (apiCall: (values: any) => Promise<any>)=>{

  const navigate = useNavigate()
  const {login, setLoading} =useAuthStore()

  const handleSubmit = async(values:any,{setSubmitting, setErrors}:any)=>{

    try {
      setLoading(true)
      const userData = await apiCall(values)
      login(userData)
      navigate('/')

    } catch (error:any) {
      if(error && typeof error === 'object' && 'message' in error){
        setErrors({email: error.message})
      }else{
        alert('Hubo un error. Inténtalo nuevamente.')
      }
      
    }finally{
      setLoading(false)
      setSubmitting(false)
    }
    
  }

  return {
    handleSubmit
  }
    
}

