import Article from './Article';
import Loader from './Loader'
import {useState,useEffect,Fragment} from 'react';
import {Input,AppBar,Grid,Button,TextareaAutosize,Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useInfiniteScroll from '../hooks/useInfiniteScroll';



const Queue = (props) => {

	const hrURL = "https://hn.algolia.com/api/v1/search";

	const parseArticle = (hit) => {
		return hit
			&&(hit.url ||hit.story_url)
			&&(hit.title || hit.story_title)
			?
		{
			url:(hit.url ||hit.story_url),
			size: "small",
			title: (hit.title || hit.story_title),
		} :
		null;
	}

	const generateArticles = async () => {
		const data = await fetch(`${hrURL}?query=${searchValue}&page=${hrPage}&hitsPerPage=5`)
		const f = await data.json();
		console.log(f);
		if (!f.hits || f.hits.length === 0) {
			setArticleList((prevState)=>([...prevState]));
		}
		setHRPage((prevState)=>(prevState+1));
		setArticleList((prevState)=>([...prevState,...f.hits.map((hit)=>parseArticle(hit))]));
		setIsLoading(false);
	}



	const [started,setStarted] = useState(false);
	// const [ended,setEnded] = useState(false);
	const [hrPage,setHRPage] = useState(0);
	const [articleList,setArticleList] = useState([]);

	const [searchValue,setSearchValue] = useState("");
	const [isLoading, setIsLoading] =
		useInfiniteScroll(generateArticles);

	useEffect(()=>{
		if (!started) return;
		generateArticles();
	},[started])

	const useStyles = makeStyles(
	{
		input:{marginLeft:"10px",marginRight:"10px",fontSize:"1.5rem",color:"white"},
		container:{display: 'flex'},

		label:{
			color:"white",
			marginTop:"25vh",
			fontFamily:"monospace",
			fontSize:"2rem",

		},
		refresh:{
			marginLeft:"auto",
		},
		full_container:{},
		full_input:{
			maxWidth:"50vw",
			marginLeft:"25vw",
			marginRight:"25vw",
			fontSize:"2rem" ,
			maxHeight:"50vh",
			marginTop:"25vh",
			border:"none",
			outline:"none",
		},
		full_button:{
			marginLeft:"25vw",
			marginRight:"25vw",
			fontSize:"2rem" ,
			fontFamily:"monospace",
			color:"white",
		}
	}
	);
	const classes = useStyles();


	const articles = articleList.map((a,i)=>{
		return (a && <Article url={a.url}
		                 key={i}
		                 title={a.title}

		                 cardSize={a.size} />);
		});


	return (
		started ?
		<Fragment>
			<AppBar position="sticky">
				<Toolbar>
					<Input edge="start" className={classes.input} variant="outlined"
							   placeholder="?"
							   value={searchValue}
							   onChange={(event)=>{setHRPage(0);setSearchValue(event.target.value)}}/>
					<Button
					className={classes.refresh}
							onClick={()=>{setArticleList([]); generateArticles()}}
						    variant="contained"
						    color="secondary"
						>
						refresh
					</Button>
				</Toolbar>
			</AppBar>
			<Grid container spacing={2} className={classes.container}>

				<Grid item xs={12}>

					{articles}
					{isLoading && <div>Loading</div>}
				</Grid>

			</Grid>
		</Fragment> :
		<Grid container spacing={2} className={classes.full_container}>
			<Grid item xs={12}>
				<TextareaAutosize
						   className={classes.full_input}
						   placeholder="what do you want to dig into?"
						   value={searchValue}
						   onChange={(event)=>{setHRPage(0);setSearchValue(event.target.value)}}/>
			</Grid>
			<Grid item xs={12}>
				<Button onClick={()=>setStarted(searchValue && searchValue.length > 0)}
					    className={classes.full_button}
					    variant="contained" color="primary"
					>
					go
				</Button>
			</Grid>
		</Grid>

	);

}

export default Queue;