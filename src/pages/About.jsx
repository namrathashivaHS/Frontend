import React, { useState } from "react";
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import Header from "./shared/Header";
import Footer from "./shared/Footer";

function About(){
    const [user, setChildData] = useState('');
    const navigate=useNavigate();
    const [cookies,removeCookie] = useCookies([]);
    const [Role,setRole] = useState("");
  
return(
    <>
    <div>
        <p>
            <h3>About Hema Vidya Sangha</h3>
            <p>
Welcome to Hema Vidya Sangha, a beacon of holistic education nestled in the heart of Bangalore, 
India. Established with a vision to nurture young minds, we take pride in our commitment to 
providing a stimulating and caring environment that promotes academic excellence, character 
development, and lifelong learning.
</p>


<h3>Our Vision and Mission</h3>
<p>
Vision: To empower students with knowledge, skills, and values that prepare them to face the challenges of the ever-changing world.
Mission: We strive to create a nurturing learning space where curiosity is encouraged, talents are honed, and character is built. We are dedicated to fostering a sense of belonging, respect, and responsibility among our students.
</p>

<h3>Why Choose Hema Vidya Sangha?</h3>
<p>
At Hema Vidya Sangha, we believe in the power of personalized education. 
Here, each child is recognized as a unique individual, and our dedicated faculty 
ensures that every student receives the attention they deserve. Our curriculum is 
designed to not only meet academic standards but also to inspire creativity and critical thinking.
</p>

<h3>Key Highlights</h3>
<p>
• Experienced Educators: Our team of highly qualified and passionate educators is dedicated to 
guiding students on their educational journey. <br />
• Inclusive Environment: We celebrate diversity and create an inclusive environment where 
every student feels valued and respected. <br />
• Holistic Development: We emphasize not only academic excellence but also the development of 
essential life skills, sportsmanship, and artistic expression. <br />
• State-of-the-Art Facilities: Our campus is equipped with modern classrooms, well-stocked libraries,
 advanced science and computer labs, and sports facilities that foster a conducive learning 
 atmosphere. <br />
• Community Engagement: We actively involve parents, guardians, and the local community in our educational initiatives, fostering a sense of belonging and shared responsibility.
</p>

<h3>Beyond Academics</h3>
<p>
Education at Hema Vidya Sangha extends beyond the classroom. We offer a vibrant range of extracurricular activities, including sports, arts, music, dance, and community service programs. These activities are designed to nurture talents, instill confidence, and encourage teamwork.
</p>

<h3>Join Our Family</h3>
<p>
At Hema Vidya Sangha, we consider our students, parents, and staff as one big family. Together, we create an atmosphere where learning is not just a task but an exciting and enriching adventure.
Explore Hema Vidya Sangha and discover a world where education knows no boundaries, where dreams are nurtured, and where young minds are prepared to make a difference.
</p>
<h4>For admissions inquiries or to schedule a visit, please contact us.</h4> 
Mobile No :- ------
        </p>
    </div>
    <button><a href="/">Back</a></button>
    </>
)
}

export default About;