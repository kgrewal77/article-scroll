import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';


const Loader = () => {

	const useStyles = makeStyles({
		loader:{maxWidth:"100%",marginTop:"25vh"},
		box:{height:"100vh"},
	});

	const classes = useStyles();

	return <Box className={classes.box}>
			  <img src={'/loading.gif'}
	            className={classes.loader}
	            alt="loading spinner" />
	        </Box>
}

export default Loader