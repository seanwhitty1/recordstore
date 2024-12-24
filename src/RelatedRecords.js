import './Recordgrid.css'
import Record from './Record'

function RelatedRecords({collection}){
      return(
            <>
            <div className='related-recordgrid-outer-container'>
            <div className='recordgrid-container xl:col-span-12 col-start-1 col-span-2 md:col-span-6 lg:col-span-6'>
            {collection.map     
            (r => <Record className='related-recordgrid-item' id={r.id} artists={r.artists} title={r.title} price={r.price} descr={r.descr} genre={r.genre} images={r.images} /> ) }
            </div>
            </div>
           </>
        )
    }

export default RelatedRecords;