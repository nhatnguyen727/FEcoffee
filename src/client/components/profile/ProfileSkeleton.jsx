import { Container, Grid, Box, CardHeader, Card, CardActions, CardContent, Divider, Button, Typography } from '@material-ui/core';
import { Skeleton } from 'antd';

function ProfileSkeleton() {
	return (
		<Container style={{ padding: '120px 8vw 80px 8vw' }}>
			<Grid container spacing={2}>
				<Grid item lg={4} md={6} xs={12}>
					<Card>
						<CardContent>
							<Box alignItems='center' display='flex' flexDirection='column'>
								<Skeleton.Avatar active={true} size={128} shape='circle' />
								<Skeleton.Input style={{ width: 200, marginTop: '10px' }} active={true} size='large' />
							</Box>
						</CardContent>
						<Divider />
						<CardActions>
							<Button color='primary' fullWidth variant='text'>
								Upload picture
							</Button>
						</CardActions>
					</Card>
				</Grid>
				<Grid item lg={8} md={6} xs={12}>
					<Card>
						<CardHeader subheader='The information can be edited' title='Profile' />
						<Divider />
						<CardContent>
							<Grid container spacing={2}>
								<Grid item md={6} xs={12}>
									<Skeleton.Input style={{ width: 180 }} active={true} size='large' />
								</Grid>
								<Grid item md={6} xs={12}>
									<Skeleton.Input style={{ width: 180 }} active={true} size='large' />
								</Grid>
								<Grid item md={6} xs={12}>
									<Skeleton.Input style={{ width: 180 }} active={true} size='large' />
								</Grid>
								<Grid item md={6} xs={12}>
									<Skeleton.Input style={{ width: 180 }} active={true} size='large' />
								</Grid>
								<Grid item md={12} xs={12}>
									<Typography color='textSecondary' variant='body1'>
										***You will be logged out if you change these fields below
									</Typography>
									<Divider />
								</Grid>
								<Grid item md={6} xs={12}>
									<Skeleton.Input style={{ width: 180 }} active={true} size='large' />
								</Grid>
								<Grid item md={6} xs={12}>
									<Skeleton.Input style={{ width: 180 }} active={true} size='large' />
								</Grid>
							</Grid>
						</CardContent>
						<Divider />
						<Box p={2}>
							<Skeleton.Button active={true} size='large' shape='default' />
						</Box>
					</Card>
				</Grid>
			</Grid>
		</Container>
	);
}

export default ProfileSkeleton;
