import './Recordgrid.css'
import Record from './Record'

function RelatedRecords({collection}){
      return(
            <>
            {collection.map     
            (r => <Record className='related-recordgrid-item lg:size-150px md:size-100px sm:size-100px' id={r.id} artists={r.artists} title={r.title} price={r.price} descr={r.descr} genre={r.genre} images={r.images} /> ) }
           </>
        )
    }

export default RelatedRecords;