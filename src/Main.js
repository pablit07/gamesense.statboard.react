import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home/Home';
import TestSubmissions from './TestSubmissions/TestSubmissions';
import DrillUsage from './DrillUsage/DrillUsage';
import CoachReport from './CoachReport/CoachReport';
import { socket } from './Socket';
import DrillDetailsView from "./DrillDetails/DrillDetailsView";
import PageContainer from "./Components/PageContainer";
import DrillDetailsChartView from "./DrillDetails/DrillDetailsChartsView";
import TestSubmissionDetail from "./TestSubmissions/TestSubmissionDetail";
import StreaksChartView from "./Streaks/StreaksChartsView";
import ComparisonChartsView from "./Comparisons/ComparisonChartsView";

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /testsubmissions
// and /drillusage routes will match any pathname that starts
// with /testsubmissions or /drillusage. The / route will only match
// when the pathname is exactly the string "/"

const Main = () => {



	return (
		<main>
			<Switch>
				<Route exact path='/' component={Home}/>
				<Route exact path='/testsubmissions/:id_submission' render={props => <PageContainer title={'Test Submission Detail'} contents={<TestSubmissionDetail socket={socket} {...props}/>}/>}/>
				<Route exact path='/testsubmissions' render={() => <PageContainer title={'Test Submissions'} contents={<TestSubmissions socket={socket}/>}/>}/>
				<Route path='/drillusage' render={() => <PageContainer title={'Drill Usage Report'} contents={<DrillUsage socket={socket}/>}/>}/>
				<Route path='/coachreport' render={() => <PageContainer title={'Coach Report'} contents={<CoachReport socket={socket}/>}/>}/>
				<Route path='/drilldetails' render={() => <PageContainer title={'Drill Breakdown Report'} contents={<DrillDetailsView socket={socket}/>}/>}/>
				<Route path='/drilldetailscharts' render={() => <PageContainer title={'Drill Breakdown Charts'} contents={<DrillDetailsChartView socket={socket}/>}/>}/>
				<Route path='/streaks' render={() => <PageContainer title={'Usage Streaks Charts'} contents={<StreaksChartView socket={socket}/>}/>}/>
				<Route path='/scorecomparisoncharts' render={() => <PageContainer title={'Score Comparison Charts - Various Scales'} contents={<ComparisonChartsView socket={socket}/>}/>}/>
				<Route path='/logout' render={() => "You have been logged out."}/>
			</Switch>
		</main>
	);
}

export default Main