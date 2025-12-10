import {
  faGithub,
  faGitlab,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const socialLinks = [
  {
    name: "gitlab",
    url: "https://gitlab.com/bjoern_urban_5",
    icon: faGitlab,
  },
  {
    name: "github",
    url: "https://github.com/B-urb",
    icon: faGithub,
  },
  {
    name: "linkedin",
    url: "https://www.linkedin.com/in/bj%C3%B6rn-u-3a9347113",
    icon: faLinkedin,
  },
  {
    name: "twitter",
    url: "https://twitter.com/bambusbijoern",
    icon: faTwitter,
  },
  {
    name: "instagram",
    url: "https://www.instagram.com/bambusbijoern/",
    icon: faInstagram,
  },
];

const Footer = () => {
  return (
    <div className="dark:text-dark-4 flex justify-center text-2xl md:text-4xl">
      <ul className="flex">
        {socialLinks.map((social) => (
          <li
            key={social.name}
            className="m-1 hover:animate-pulse hover:cursor-pointer sm:m-3"
          >
            <a
              aria-label={social.name}
              href={social.url}
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={social.icon} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Footer;
