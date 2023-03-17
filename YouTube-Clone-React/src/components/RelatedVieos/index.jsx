import { useState, useEffect } from 'react'
import api from '../../api/axios'
import { Link } from 'react-router-dom'
import { RelatedVideoWrapper, VideoImg, VideoInfo } from './style'

// export const getRelativedVideos = async (videoId) => {
// 	const response = await api.get('/search', {
// 		params: {
//       part: 'snippet',
//       maxResults: '10',
//       relatedToVideoId: videoId,
//       type: 'video',
// 			regionCode: 'kr'
// 		},
// 	})
// 	return response.data.items
// }

// videoId 값을 받아와야 하는데 아직 만들어지지 않았으므로, 임의의 영상 ID로 일단 진행.

export const getRelativedVideos = async () => {
	const response = await api.get('/search', {
		params: {
			part: 'snippet',
			maxResults: '25',
			relatedToVideoId: 'o5KfPhT_19M',
			type: 'video',
			regionCode: 'kr',
		},
	})
	return response.data.items
}

const RelativedVideos = (videoId) => {
	const [videos, setVideos] = useState([])
	useEffect(() => {
		getRelativedVideos(videoId).then((res) => {
			setVideos(res)
		})
	}, [])
	return (
		<>
			{videos.map((video) => (
				<RelatedVideoWrapper key={video.id.videoId}>
					<Link to={`/video/${video.id.videoId}`}>
						<VideoImg>
							<img src={video.snippet.thumbnails.medium.url} alt="썸네일" />
						</VideoImg>
						<VideoInfo>
							<div>
								<p className="videoTitle">{video.snippet.title}</p>
							</div>
							<p className="channelTitle">{video.snippet.channelTitle}</p>
							<p className="subscribeInfo">조회수n회</p>
						</VideoInfo>
					</Link>
				</RelatedVideoWrapper>
			))}
		</>
	)
}

export default RelativedVideos
