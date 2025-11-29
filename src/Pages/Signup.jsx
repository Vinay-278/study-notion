import signupImg from '../assets/Images/signup.webp'
import Template from '../Components/Core/Auth/Template'

const Signup = () => {
  return (
    <Template
      title="Join the millions to code with StudyNotion for free"
      description1="Build skills for today, tommorow, and beyond."
      description2="Education to future-proof your career."
      image={signupImg}
      formType="signup"
    />
  )
}

export default Signup
