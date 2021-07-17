import { Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Loader from './Loader'

// import {
//   EmailShareButton,
//   FacebookShareButton,
//   LinkedinShareButton,
//   RedditShareButton,
//   TwitterShareButton,
//   EmailIcon,
//   FacebookIcon,
//   LinkedinIcon,
//   RedditIcon,
//   TwitterIcon,
// } from "react-share";
import { LinkPreview } from '@dhaiwat10/react-link-preview';

const Article = (props) => {

	const useStyles = makeStyles({
	  // discard: {
	  //   justifySelf: "flex-start",
	  // },
	  // save: {
	  //   justifySelf: "flex-end",
	  // },
	  card: {
	    minHeight: "25vh",
	    minWidth: "50vh"
	  },
	  icon: {
	  	paddingLeft: "1vw",
	  	paddingRight: "1vw",
	  }

	});

	const classes = useStyles();

	return (
		<Card  className={classes.card}>
			<CardContent>
				<LinkPreview className={classes.card} fallback={<div/>} url={props.url} />
			</CardContent>
		</Card>
	  );
}

export default Article;