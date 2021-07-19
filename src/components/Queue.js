import Article from './Article';
import Loader from './Loader'
import {useState,useEffect,useRef,Fragment} from 'react';
import {Input,AppBar,Grid,Button,TextareaAutosize,Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useInfiniteScroll from '../hooks/useInfiniteScroll';



const Queue = (props) => {

	const hrURL = "https://hn.algolia.com/api/v1/search";
	const inputRef = useRef(null);

	const parseArticle = (hit) => {
		return hit
			&&(hit.url ||hit.story_url)
			&&(hit.title || hit.story_title)
			?
		{
			url:(hit.url ||hit.story_url),
			size: "small",
			title: (hit.title || hit.story_title),
			ended: false,
		} :
		null;
	}

	const generateArticles = async (page) => {
		const hp = page !== undefined ? page : hrPage;
		const data = await fetch(`${hrURL}?query=${searchValue}&page=${hp}&hitsPerPage=5`)
		//console.log(hp);
		const f = await data.json();
		//console.log(f);
		if (!f.hits || f.hits.length === 0) {
			setArticleList((prevState)=>{
				if (prevState.length> 0 && prevState[prevState.length-1].ended) {
					return prevState;
				} 
				return ([...prevState,{ended:true}])
			});
		}
		setHRPage((prevState)=>(hp+1));
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

		if (!started) {
			inputRef.current.focus();
			return;
		}
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
		                 ended={a.ended}
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
							   ref={inputRef}
							   onChange={(event)=>{setHRPage(0);setSearchValue(event.target.value)}}/>
					<Button
					className={classes.refresh}
							onClick={()=>{
								setHRPage(0);setArticleList([]);window.scrollBy(0,100);}}
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
					{isLoading && <Loader/>}
				</Grid>

			</Grid>
		</Fragment> :
		<Grid container spacing={2} className={classes.full_container}>
			<Grid item xs={12}>
				<TextareaAutosize ref={inputRef}
						   className={classes.full_input}
						   placeholder="what tech do you want to dig into?"
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