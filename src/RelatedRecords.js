import './Recordgrid.css'
import Record from './Record'

function RelatedRecords({collection}){
    console.log("inside related records component", collection)
      return(
            <>
            <div className='related-recordgrid-outer-container'>
            <div className='recordgrid-container xl:col-span-10 col-start-1 col-span-2 md:col-span-6 lg:col-span-6'>
            {collection.map(r => <Record className='related-recordgrid-item' id={r.id} artists={r.artists} title={r.title} price={r.price} images={r.images} /> ) }
            </div>
            </div>
           </>

           /**artists
: 
[{…}]

description
: 
""
format
: 
"12\" Vinyl"
id
: 
10
images
: 
(2) ['{"type":"primary","uri":"https://i.discogs.com/PXw…1/Ny0yMDc0LmpwZWc.jpeg","width":600,"height":600}', '{"type":"secondary","uri":"https://i.discogs.com/Q…2/MC03MjM2LmpwZWc.jpeg","width":600,"height":600}']
labels
: 
[{…}]
price
: 
22
quantity
: 
1
record_genre
: 
{createdAt: '2024-12-02T14:56:45.900Z', updatedAt: '2024-12-02T14:56:45.900Z', recordId: 10, genreId: 14}
tags
: 
[{…}]
title
: 
"Jungle Infiltrator"
tracklist
: 
(4) ['{"position":"A1","type_":"track","title":"Jungle Infiltrator","duration":""}', '{"position":"A2","type_":"track","title":"Jazz Lick","duration":""}', '{"position":"B1","type_":"track","title":"Indian Dub","duration":""}', '{"position":"B2","type_":"track","title":"Life Dub","duration":""}']
updatedAt
: */
        )
    }

export default RelatedRecords;