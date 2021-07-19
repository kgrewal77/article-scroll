import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
	    //minWidth: "25vh",
	    maxHeight: "100vh",
	    maxWidth: "100vw",
	  },
	  placeholder:{
		    minHeight: "0vh",
		    minWidth: "0vh",
		    maxHeight: "0vh",
		    maxWidth:"0vw",	  
		},
	  nodata:{
	  	height:"99vh",
	  },
	  icon: {
	  	paddingLeft: "1vw",
	  	paddingRight: "1vw",
	  }

	});

	const classes = useStyles();

	return (
		<Card >
			{!props.ended ?
			<CardContent>
				<LinkPreview 
					className={classes.card} 
					fallback={<div className={classes.placeholder}/>} 
					url={props.url} /> 
			</CardContent> :
			<CardContent className={classes.nodata}>
				<Typography variant="h5" component="h2">
					No Results Found
				</Typography>
				<Typography color="textSecondary">
		          try refreshing or entering another search term
		        </Typography>
	        </CardContent>
				}
		</Card>
	  );
}

export default Article;