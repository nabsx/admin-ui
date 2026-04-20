import React from 'react'
import UserCard from "./UserCard";

function Exercise() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
          User Cards
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <UserCard 
          name="sulthan"
          email="sulthan.yustr@gmail.com"
          street="jl.sambiroto"
          city="semarang"/>
          <UserCard 
          name="yustr"
          email="yustr@gmail.com"
          street="jl.sambiroto 3"
          city="semarang"/>
          <UserCard 
          name="suwardhi"
          email="suwardhi@gmail.com"
          street="jl.sambiroto 4"
          city="semarang"/>
        </div>
      </div>
    </>
  );
}
       
export default Exercise