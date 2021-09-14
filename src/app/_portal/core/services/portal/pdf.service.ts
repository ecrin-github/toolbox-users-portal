import {Injectable} from '@angular/core';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { ResourceInterface } from '../../interfaces/entities/resource.interface';


@Injectable({providedIn: 'root'})
export class PdfService {

  constructor() {
  }

  multipleResourcesPDFGenerator(data: Array<ResourceInterface>) {

    const doc = new jsPDF();
    const fileName = 'Resources list - ' + Date.now().toString();

    let bodyData: Array<any> = [];

    data.forEach((resourceData, index) => {

      bodyData.push([{content: resourceData.title, colSpan: 3, rowSpan: 1,
        styles: {halign: 'left', fontStyle: 'bold', fontSize: 16}}]);

      let abstract = 'NaN';
      if (resourceData.abstract !== null && resourceData.abstract !== undefined) {
        if (resourceData.abstract.trim() !== '') {
          abstract = resourceData.abstract;
        }
      }
      bodyData.push([{content: 'Abstracts:' + '\n\n' + abstract, colSpan: 3, rowSpan: 1,
        styles: {halign: 'left', fontStyle: 'normal', fontSize: 14}}]);


      let authors = 'NaN';
      if (resourceData.authors !== null && resourceData.authors !== undefined) {
        if (resourceData.authors.trim() !== '') {
          authors = resourceData.authors;
        }
      }

      let url = 'NaN';
      if (resourceData.url !== null && resourceData.url !== undefined) {
        if (resourceData.url.trim() !== '') {
          url = resourceData.url;
        }
      }

      let fileUrl = 'NaN';
      if (resourceData.resource_file !== null && resourceData.resource_file !== undefined) {
        if (resourceData.resource_file.trim() !== '') {
          fileUrl = resourceData.resource_file;
        }
      }

      let doi = 'NaN';
      if (resourceData.doi !== null && resourceData.doi !== undefined) {
        if (resourceData.doi.trim() !== '') {
          doi = resourceData.doi;
        }
      }

      let yearOfPublication = 'NaN';
      if (resourceData.year_of_publication !== null && resourceData.year_of_publication !== undefined) {
        yearOfPublication = resourceData.year_of_publication.toString();
      }

      let typeOfResource = 'NaN';
      if (resourceData.type_of_resource !== null && resourceData.type_of_resource !== undefined) {
        if (resourceData.type_of_resource.name !== '') {
          typeOfResource = resourceData.type_of_resource.name;
        }
      }
      bodyData.push([
        {content: 'Author(s):' + '\n\n' + authors, colSpan: 1, rowSpan: 1,
          styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 45}},
        {content: 'DOI:' + '\n\n' + doi, colSpan: 1, rowSpan: 1,
          styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 45}},
        {content: 'Year of publication:' + '\n\n' + yearOfPublication, colSpan: 1, rowSpan: 1,
          styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 45}}
      ]);

      bodyData.push([
        {content: 'Type of resource:' + '\n\n' + typeOfResource, colSpan: 1, rowSpan: 1,
          styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 45}},
        {content: 'URL:' + '\n\n' + url, colSpan: 1, rowSpan: 1,
          styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 45}},
        {content: 'Attached file URL:' + '\n\n' + fileUrl, colSpan: 1, rowSpan: 1,
          styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 45}}
      ]);


      let resourceTypes = '';
      if (resourceData.tags.resource_type !== null && resourceData.tags.resource_type !== undefined) {
        if (resourceData.tags.resource_type.length  > 0) {
          for (const resType of resourceData.tags.resource_type) {
            resourceTypes += resType.name + '; ';
          }
        } else {
          resourceTypes = 'NaN';
        }
      }

      let researchFields = '';
      if (resourceData.tags.research_field !== null && resourceData.tags.research_field !== undefined) {
        if (resourceData.tags.research_field.length  > 0) {
          for (const resField of resourceData.tags.research_field) {
            researchFields += resField.name + '; ';
          }
        } else {
          researchFields = 'NaN';
        }
      }

      let specificTopics = '';
      if (resourceData.tags.specific_topics !== null && resourceData.tags.specific_topics !== undefined) {
        if (resourceData.tags.specific_topics.length  > 0) {
          for (const specTopic of resourceData.tags.specific_topics) {
            specificTopics += specTopic.name + '; ';
          }
        } else {
          specificTopics = 'NaN';
        }
      }
      bodyData.push([
        {content: 'Resource type(s):' + '\n\n' + resourceTypes, colSpan: 1, rowSpan: 1,
          styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 45}},
        {content: 'Research field(s):' + '\n\n' + researchFields, colSpan: 1, rowSpan: 1,
          styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 45}},
        {content: 'Specific topic(s):' + '\n\n' + specificTopics, colSpan: 1, rowSpan: 1,
          styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 45}}
      ]);


      let dataType = '';
      if (resourceData.tags.data_type !== null && resourceData.tags.data_type !== undefined) {
        if (resourceData.tags.data_type.name !== null && resourceData.tags.data_type.name.trim() !== '') {
          dataType = resourceData.tags.data_type.name;
        } else {
          dataType = 'NaN';
        }
      }

      let dataSubtypes = '';
      if (resourceData.tags.data_type !== null && resourceData.tags.data_type !== undefined) {
        if (resourceData.tags.data_type.subs !== null) {
          if (resourceData.tags.data_type.subs.length > 0) {
            for (const dataSub of resourceData.tags.data_type.subs) {
              dataSubtypes += dataSub.name + '; ';
            }
          } else {
            dataSubtypes = 'NaN';
          }
        } else {
          dataSubtypes = 'NaN';
        }
      }

      let geoScope = '';
      if (resourceData.tags.geographical_scope !== null && resourceData.tags.geographical_scope !== undefined) {
        if (resourceData.tags.geographical_scope.name !== null && resourceData.tags.geographical_scope.name.trim() !== '') {
          geoScope = resourceData.tags.geographical_scope.name;
        } else {
          geoScope = 'NaN';
        }
      }

      let countries = '';
      if (resourceData.tags.geographical_scope !== null && resourceData.tags.geographical_scope !== undefined) {
        if (resourceData.tags.geographical_scope.countries_grouping !== null) {
          if (resourceData.tags.geographical_scope.countries_grouping.length > 0) {
            for (const country of resourceData.tags.geographical_scope.countries_grouping) {
              countries += country + '; ';
            }
          } else {
            countries = 'NaN';
          }
        } else {
          countries = 'NaN';
        }
      }
      bodyData.push([
        {content: 'Data type:' + '\n\n' + dataType, colSpan: 1, rowSpan: 1,
          styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 45}},
        {content: 'Data subtype(s):' + '\n\n' + dataSubtypes, colSpan: 2, rowSpan: 1,
          styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 45}},
      ]);


      bodyData.push([
        {content: 'Geographical scope:' + '\n\n' + geoScope, colSpan: 1, rowSpan: 1,
          styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 45}},
        {content: 'Countries grouping:' + '\n\n' + countries, colSpan: 2, rowSpan: 1,
          styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 45}},
      ]);

      // const splitTitle = doc.splitTextToSize(data[i].title, 180);

      if (index === 0) {
        // doc.text(splitTitle, 15, 10);
        // @ts-ignore
        doc.autoTable({
          startY: 20,
          theme: 'grid',
          body: bodyData,
        });
      } else {
        // @ts-ignore
        // doc.text(splitTitle, 5, doc.autoTable.previous.finalY + 15);
        // @ts-ignore
        doc.autoTable({
          // @ts-ignore
          startY: doc.autoTable.previous.finalY + 5,
          theme: 'grid',
          body: bodyData,
        });
      }
      bodyData = [];
    });

    doc.save(fileName + '.pdf');
  }


  singleResourcePDFGenerator(resourceData: ResourceInterface){
    const doc = new jsPDF();

    const bodyData: Array<any> = [];

    bodyData.push([{content: resourceData.title, colSpan: 3, rowSpan: 1,
      styles: {halign: 'left', fontStyle: 'bold', fontSize: 16}}]);

    let abstract = 'NaN';
    if (resourceData.abstract !== null && resourceData.abstract !== undefined) {
      if (resourceData.abstract.trim() !== '') {
        abstract = resourceData.abstract;
      }
    }
    bodyData.push([{content: 'Abstracts:' + '\n\n' + abstract, colSpan: 3, rowSpan: 1,
      styles: {halign: 'left', fontStyle: 'normal', fontSize: 14}}]);


    let authors = 'NaN';
    if (resourceData.authors !== null && resourceData.authors !== undefined) {
      if (resourceData.authors.trim() !== '') {
        authors = resourceData.authors;
      }
    }

    let url = 'NaN';
    if (resourceData.url !== null && resourceData.url !== undefined) {
      if (resourceData.url.trim() !== '') {
        url = resourceData.url;
      }
    }

    let fileUrl = 'NaN';
    if (resourceData.resource_file !== null && resourceData.resource_file !== undefined) {
      if (resourceData.resource_file.trim() !== '') {
        fileUrl = resourceData.resource_file;
      }
    }

    let doi = 'NaN';
    if (resourceData.doi !== null && resourceData.doi !== undefined) {
      if (resourceData.doi.trim() !== '') {
        doi = resourceData.doi;
      }
    }

    let yearOfPublication = 'NaN';
    if (resourceData.year_of_publication !== null && resourceData.year_of_publication !== undefined) {
      yearOfPublication = resourceData.year_of_publication.toString();
    }

    let typeOfResource = 'NaN';
    if (resourceData.type_of_resource !== null && resourceData.type_of_resource !== undefined) {
      if (resourceData.type_of_resource.name !== '') {
        typeOfResource = resourceData.type_of_resource.name;
      }
    }
    bodyData.push([
        {content: 'Author(s):' + '\n\n' + authors, colSpan: 1, rowSpan: 1,
      styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 45}},
        {content: 'DOI:' + '\n\n' + doi, colSpan: 1, rowSpan: 1,
          styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 45}},
      {content: 'Year of publication:' + '\n\n' + yearOfPublication, colSpan: 1, rowSpan: 1,
        styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 45}}
    ]);

    bodyData.push([
      {content: 'Type of resource:' + '\n\n' + typeOfResource, colSpan: 1, rowSpan: 1,
        styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 45}},
      {content: 'URL:' + '\n\n' + url, colSpan: 1, rowSpan: 1,
        styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 45}},
      {content: 'Attached file URL:' + '\n\n' + fileUrl, colSpan: 1, rowSpan: 1,
        styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 45}}
    ]);


    let resourceTypes = '';
    if (resourceData.tags.resource_type !== null && resourceData.tags.resource_type !== undefined) {
      if (resourceData.tags.resource_type.length  > 0) {
        for (const resType of resourceData.tags.resource_type) {
          resourceTypes += resType.name + '; ';
        }
      } else {
        resourceTypes = 'NaN';
      }
    }

    let researchFields = '';
    if (resourceData.tags.research_field !== null && resourceData.tags.research_field !== undefined) {
      if (resourceData.tags.research_field.length  > 0) {
        for (const resField of resourceData.tags.research_field) {
          researchFields += resField.name + '; ';
        }
      } else {
        researchFields = 'NaN';
      }
    }

    let specificTopics = '';
    if (resourceData.tags.specific_topics !== null && resourceData.tags.specific_topics !== undefined) {
      if (resourceData.tags.specific_topics.length  > 0) {
        for (const specTopic of resourceData.tags.specific_topics) {
          specificTopics += specTopic.name + '; ';
        }
      } else {
        specificTopics = 'NaN';
      }
    }
    bodyData.push([
      {content: 'Resource type(s):' + '\n\n' + resourceTypes, colSpan: 1, rowSpan: 1,
        styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 45}},
      {content: 'Research field(s):' + '\n\n' + researchFields, colSpan: 1, rowSpan: 1,
        styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 45}},
      {content: 'Specific topic(s):' + '\n\n' + specificTopics, colSpan: 1, rowSpan: 1,
        styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 45}}
    ]);


    let dataType = '';
    if (resourceData.tags.data_type !== null && resourceData.tags.data_type !== undefined) {
      if (resourceData.tags.data_type.name !== null && resourceData.tags.data_type.name.trim() !== '') {
        dataType = resourceData.tags.data_type.name;
      } else {
        dataType = 'NaN';
      }
    }

    let dataSubtypes = '';
    if (resourceData.tags.data_type !== null && resourceData.tags.data_type !== undefined) {
      if (resourceData.tags.data_type.subs !== null) {
        if (resourceData.tags.data_type.subs.length > 0) {
          for (const dataSub of resourceData.tags.data_type.subs) {
            dataSubtypes += dataSub.name + '; ';
          }
        } else {
          dataSubtypes = 'NaN';
        }
      } else {
        dataSubtypes = 'NaN';
      }
    }

    let geoScope = '';
    if (resourceData.tags.geographical_scope !== null && resourceData.tags.geographical_scope !== undefined) {
      if (resourceData.tags.geographical_scope.name !== null && resourceData.tags.geographical_scope.name.trim() !== '') {
        geoScope = resourceData.tags.geographical_scope.name;
      } else {
        geoScope = 'NaN';
      }
    }

    let countries = '';
    if (resourceData.tags.geographical_scope !== null && resourceData.tags.geographical_scope !== undefined) {
      if (resourceData.tags.geographical_scope.countries_grouping !== null) {
        if (resourceData.tags.geographical_scope.countries_grouping.length > 0) {
          for (const country of resourceData.tags.geographical_scope.countries_grouping) {
            countries += country + '; ';
          }
        } else {
          countries = 'NaN';
        }
      } else {
        countries = 'NaN';
      }
    }
    bodyData.push([
      {content: 'Data type:' + '\n\n' + dataType, colSpan: 1, rowSpan: 1,
        styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 45}},
      {content: 'Data subtype(s):' + '\n\n' + dataSubtypes, colSpan: 2, rowSpan: 1,
        styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 45}},
    ]);

    bodyData.push([
      {content: 'Geographical scope:' + '\n\n' + geoScope, colSpan: 1, rowSpan: 1,
        styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 45}},
      {content: 'Countries grouping:' + '\n\n' + countries, colSpan: 2, rowSpan: 1,
        styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 45}},
    ]);

    // doc.text(doc.splitTextToSize(resourceData.title, 180), 15, 10);
    // @ts-ignore
    doc.autoTable({
      startY: 5,
      theme: 'grid',
      body: bodyData,
    });

    doc.save(resourceData.title + '.pdf');
  }

}
