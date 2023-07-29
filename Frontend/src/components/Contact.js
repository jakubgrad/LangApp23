import TopNavBar from "./TopNavBar";

function Contact() {
    return (
      <div>
        <TopNavBar />
        <div style={{ padding: 20 }}>
          <h2>Contact</h2>
          <p>
          {/* eslint-disable-next-line react/jsx-no-target-blank */}
          <a className="githublink" target="_blank" style={{ color: "blue"}} href="mailto:jakub.grad@icloud.com">jakub.grad@icloud.com</a>
          </p>
          <p>
            {/* eslint-disable-next-line react/jsx-no-target-blank */}
            <a className="githublink" target="_blank" style={{ color: "blue"}} href="https://www.linkedin.com/in/jakub-grad-880543242/"> Linkedin</a>
          </p>
          <p>
            {/* eslint-disable-next-line react/jsx-no-target-blank */}
            <a className="githublink" target="_blank" style={{ color: "blue"}} href="https://github.com/jakubgrad"> Github</a>
          </p>
        </div>
      </div>
    );
  }

  export default Contact