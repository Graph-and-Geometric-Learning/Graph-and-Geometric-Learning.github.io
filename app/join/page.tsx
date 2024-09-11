import styles from "./JoinPage.module.css";

export default function JoinPage() {
  return (
    <div className={styles.container}>
      For perspective students, I appreciate reading the following before
      reaching out to me through email. To make it easier for me to identify the
      applications, use "PhD (or Postdoc, Visiting Student) Application" as your
      title. Due to the abundance of application emails, I might not be able to
      always respond to the email. But if you believe that you possess the
      credentials and quality mentioned below, feel free to remind me if you
      have not received a response after a week.
      <h4>Note (special focus):</h4>
      <ul>
        <li>
          If you are interested in generative AI and specifically spatial AGI,
          we have industrial collaboration opportunities to work on this
          direction.
        </li>
        <li>
          If you are interested in applying for PhD program focusing on AI for
          neuroscience, explicitly mention it in the email when reaching out to
          me. I encourage you to check out{" "}
          <a href="https://wti.yale.edu/research/neurocomputation">
            WTI (computational track)
          </a>
          , which I'm a part of.
        </li>
        <li>
          {" "}
          If you are interested in AI for computational biology, check out{" "}
          <a href="https://cbb.yale.edu/">Yale CBB program</a>, which I'm also a
          part of.
        </li>
      </ul>
      <h3>PhDs</h3>
      When reaching out to me, it would be best to demonstrate the following in
      your email.
      <ul>
        <li>
          <strong>
            Reaching out early and ask about opportunity for collaboration
          </strong>{" "}
          with my lab can be a very effective way to stand out from all the
          candidates.
        </li>
        <li>
          Highly competitive PhD student applicants usually had{" "}
          <strong>abundant research experiences</strong> prior to the
          application. Note that the number of publications is not the crucial
          factor, but quality, novelty and potential impact of the research are.{" "}
        </li>
        <li>
          A student who had a single top-tier publication, but demonstrated
          outstanding ability (usually as a first author) in idea formulation,
          implementation, experiments, analysis and writing is considered more
          competitive than a student who participated in many research works but
          did not own / lead one from beginning to the end.
        </li>
        <li>
          Publications in top-tier ML and data mining conferences such as
          NeurIPS, ICML, ICLR, KDD, WebConf etc. are highly encouraged.
          High-impact journal publications in interdisciplinary fields are also
          highly appreciated.
        </li>
        <li>
          It is recommended that the field of your prior research is under the
          broad category of machine learning. However, the actual research topic
          does <strong>not</strong> need to be similar to mine, as long as the
          candidate demonstrates interests and understanding of the research
          topics of our lab, and has demonstrated the good quality as mentioned
          above. We welcome diversity at all levels, including skill sets!
        </li>
      </ul>
      <h4>Note:</h4>I understand that while most applicants have prior research
      experiences and paper in submission, some of the students do not yet have
      a top conference publication yet. I recommend highly motivated students to
      reach out to me way earlier than the admission deadline, and join as a
      collaborator in existing projects, with the goal of a publication. I will
      be able to occasionally brainstorm, discuss and meet. Major progress,
      achievements and paper during the project can better help me advocate for
      the application.
      <h3>Master Students</h3>I am part of the Yale Computer Science Master
      Advising Committee. Master students are encouraged to apply only through
      the school application portal. If you are already admitted by a program at
      Yale and are interested in doing research with me, feel free to send me an
      email for further discussions.
      <h3>Postdocs</h3>
      Postdoc candidates are encouraged to reach out to me as well. Our lab
      hires, on average, 1 postdoc every 2 years.
      <ul>
        <li>
          Successful candidates usually have 3 or more solid and highly
          impactful publications in an area, and have a coherent and unified
          thesis on a specific topic, encompassing a number of works.
        </li>
        <li>
          Similar to evaluating PhD applicants, I value paper quality over
          quantity. The standard will be higher for postdoc candidates.
        </li>
        <li>
          Prior experiences in leading a team of researchers on a large-scope
          project will be appreciated.
        </li>
        <li>
          The candidates are required to have extensive research experiences in
          either foundation models, multimodal models, graph learning,
          trustworthy deep learning or relational reasoning.
        </li>
      </ul>
      After passing preliminary screening, The candidate will be asked to give a
      research talk (remote or in-person) to the group and talk to lab members,
      before receiving a decision.
      <h3>Visiting Students</h3>I welcome visiting students / internships at all
      levels. The duration can be somewhat flexible, although the student is
      required to be committed towards finishing a research project for
      publication (as first author or co-author). Students are required to
      demonstrate a strong interest, good background knowledge, strong coding
      skills and commitment to research in the research areas mentioned. Prior
      research experiences are encouraged.
    </div>
  );
}
