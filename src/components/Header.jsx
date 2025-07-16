function Header() {
  return (
    <header className="bg-[#0D1B2A] text-white shadow-md">
      <div className=" px-4 py-4  items-center h-25 w-full flex justify-between ">
        <div>
          <img
           src="./src/assets/image/logo.png"
          alt="Logo"
            className="absolute top-4 left-4 h-20 w-20 rounded-full z-50"
          />
           <p className="text-2xl font-bold text-cyan-400 tracking-wide ml-24">
        
          Smart Recruiter
        </p> 
        </div>
       
        <div className="hidden md:block ">
          <a
            href="/login"
            className="bg-cyan-400 hover:bg-cyan-500 text-[#0D1B2A] font-semibold px-5 py-2 rounded-full transition mx-6"
          >
            Login
          </a>
          <a
            href="#"
            className="bg-cyan-400 hover:bg-cyan-500 text-[#0D1B2A] font-semibold px-5 py-2 rounded-full transition"
          >
            SignUp
          </a>
          </div>
      </div>
    </header>
  );
}

export default Header;
