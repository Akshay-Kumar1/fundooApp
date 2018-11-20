import { Injectable } from '@angular/core';
import { HttpService } from '../httpService/http.service';

@Injectable({
  providedIn: 'root'
})
export class NoteserviceService {
  token = localStorage.getItem('token')
  constructor(private http : HttpService) { }
  
  addNotes(body){
return this.http.formEncoded('/notes/addNotes',body)
  }
  label(body)
  {
    return this.http.jsonPost('/noteLabels',body)
  }
  updateNotes(body)
  {
    return this.http.formEncoded('/notes/updateNotes',body)
  }
  getArchive()
  {
    return this.http.jsonGet('/notes/getArchiveNotesList')  
  }
  getNotesCollection()
  {
    return this.http.jsonGet('/noteLabels/getNoteLabelList')
  }
  archive(body)
  {
    return this.http.jsonPost('/notes/archiveNotes',body)
  }
  unArchive(body)
  {
    return this.http.jsonPost('/notes/archiveNotes',body)
  }
  trashNotes()
  {
    return this.http.jsonGet('/notes/getTrashNotesList')
  }
  deleteTrash(body)
  {
    return this.http.jsonPost('/notes/deleteForeverNotes',body)
  }
  restoreNotes(body)
  {
    return this.http.jsonPost('/notes/trashNotes',body)
  }
  saveNotes()
  {
    return this.http.jsonGet('/notes/getNotesList')
  }
  postColor(body)
  {
      return this.http.jsonPost('/notes/changesColorNotes',body) 
  }
  labelsPrint()
{
  return this.http.jsonGet('/noteLabels/getNoteLabelList') 
}
deleteLabels(id)
{
  return this.http.jsonDelete('/noteLabels/' + id + '/deleteNoteLabel') 
}
editLabels(id,body)
{
  return this.http.formEncoded('/noteLabels/' + id + '/updateNoteLabel',body)
}
labelByNames(labelName,body)
{
  return this.http.formEncoded('/notes/getNotesListByLabel/'+labelName+'',body)
}
deleteNotes(body)
{
  return this.http.jsonPost('/notes/trashNotes',body)
}
addLabelTags(cardId,labelId,body)
{
  return this.http.jsonPost('/notes/'+ cardId +'/addLabelToNotes/'+ labelId +'/add',body)

}
pinUnpin(body)
{
  return this.http.jsonPost('/notes/pinUnpinNotes',body)
}

getReminder()
{
  return this.http.jsonGet('/notes/getReminderNotesList')
}
reminder(body)
{
  return this.http.jsonPost('/notes/addUpdateReminderNotes',body)
}

removeReminders(body)
{
  return this.http.jsonPost('/notes/removeReminderNotes',body)

}
removeLabelTags(id,labelId,body)
{
  return this.http.jsonPost('/notes/'+ id +'/addLabelToNotes/'+labelId+'/remove',body)
}

deleteTrashes(id,modifiedCheckList,body)
{
  return this.http.jsonPost("/notes/" +id+ "/checklist/" + modifiedCheckList+ "/update",body)
}
updateCheck(id,checkid,body)
{
  return this.http.jsonPost("/notes/" +id+ "/checklist/" + checkid + "/update",body)
}
deleted(data,body)
{
  return this.http.jsonPost("/notes/" + data + "/checklist/add",body)
}
removeCheck(data,removedList,body)
{
  return this.http.jsonPost("/notes/" + data+ "/checklist/" + removedList + "/remove",body)
}
}