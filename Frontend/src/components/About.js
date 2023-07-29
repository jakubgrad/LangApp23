import TopNavBar from "./TopNavBar";

function About() {
    return (
      <div>
        <TopNavBar />
        <div style={{ padding: 20 }}>
          <h2>About</h2>
          <p>
            Welcome to my website!
            This website provides a unique feature that allows you to upload a PDF file and 
            read it online. But that's not all! There's an extra touch of magic to enhance 
            your reading experience.
          </p>
          <p>
            When you view the PDF on our website, you can click on any word in the document, 
            and a translation and description of that word will magically appear in the box right next 
            to it! This is thanks to a powerful mage, the Wiktionary database that provides the website with 
            instant definitions and insights.
          </p>
          <p>
            This is a very early stage of the website and perhaps only a proof of concept. Nevertheless,
            it is possible to upload a pdf file and then see it on the "book shelf" on the left side of the page
            (just remember to refresh!)
          </p>
          <p>
          <a className="githublink" target="_blank" style={{ color: "blue"}} href = "https://github.com/jakubgrad/LangApp23">The whole code of the website is publicly available on Github.</a> For questions or suggestions, please don't hesitate to 
            contact me via the "Contact" link in the navigation bar. <br></br>Happy reading!<br></br>Jakub Grad
          </p>
        </div>
      </div>
    );
  }
  export default About;