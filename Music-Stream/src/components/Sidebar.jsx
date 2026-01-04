import React from 'react'
import {assets} from '../assets/assets'
import {useNavigate} from 'react-router-dom'

const Sidebar = () => {
  const navigate = useNavigate();



    return (
      <div className='text-white w-[35%] h-screen p-2 flex-col gap-2 hidden lg:flex '> 
         <div className='bg-[#121212] h-[20%] rounded flex flex-col justify-around'>
              <div onClick={()=>navigate('/')} className='flex items-center gap-3 pl-8 cursor-pointer'>
                    <img className='w-6' src={assets.home_icon} alt=""/>
                    <p className='font-bold'>Home</p>
              </div>
               <div className='flex items-center gap-3 pl-8 cursor-pointer'>
                    <img className='w-6' src={assets.search_icon} alt=""/>
                    <p className='font-bold'>Search</p>
              </div>
            </div>
            <div className='bg-[#121212] h-[85%] rounded'>
                <div className='p-4 flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                        <img className='w-6' src={assets.stack_icon} alt=""/>
                    <p className='font-bold'>Your Library</p>

                    </div>
                     <div className=' flex items-center gap-8'>
                <img className='w-4'src={assets.arrow_icon} alt="" />
                <img className='w-4'src={assets.plus_icon} alt="" />
              </div>

                </div>
                <div className='p-4 bg-[#391d1d] m-1 rounded font-semibold flex flex-col items-start justify-start '>
                <h1>Create your first playlist</h1>
                <p className='font-light'>It's easy we will help you</p>
              <button className='px-3 py-2 bg-white text-[15px] text-black rounded-full mt-4 cursor-pointer'>Create playlist </button>

              </div>
               <div className='p-4 bg-[#859f53] m-1 rounded font-semibold flex flex-col items-start justify-start mt-3 '>
                <h1>Let's find some podcasts to follow</h1>
                <p className='font-light'>we'll keep you update on new episodes</p>
              <button className='px-3 py-2 bg-white text-[15px] text-black rounded-full mt-4 cursor-pointer'>Browse podcasts </button>

              </div>

            </div>
           
      </div>
    

)

}
export default Sidebar