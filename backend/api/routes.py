from . import api_blueprint
from flask import request, jsonify
from backend.services import openai_service, pinecone_service, scraping_service
from backend.utils.helper_functions import chunk_text, build_prompt, get_pdf_text, get_text_chunks, get_vectorstore

####################

PINECONE_INDEX_NAME = 'seamaster01'

from PyPDF2 import PdfReader
# from langchain.text_splitter import CharacterTextSplitter
# from langchain.embeddings import OpenAIEmbeddings, HuggingFaceInstructEmbeddings
# from langchain_openai import OpenAIEmbeddings
# from langchain_community.embeddings import HuggingFaceInstructEmbeddings, OpenAIEmbeddings
# from langchain_community.vectorstores.faiss import FAISS
# from langchain_community.chat_models import ChatOpenAI
# from langchain.chains.conversation.memory import ConversationBufferMemory
# from langchain.chains import ConversationalRetrievalChain
# from langchain_community.llms import HuggingFaceHub
# ####################

@api_blueprint.route('/handle-query', methods=['POST'])
def handle_query():
    question = request.json['question']
    context_chunks = pinecone_service.get_most_similar_chunks_for_query(question, PINECONE_INDEX_NAME)
    prompt = build_prompt(question, context_chunks)
    print("\n==== PROMPT ====\n")
    print(prompt)
    answer = openai_service.get_llm_answer(prompt)
    return jsonify({ "question": question, "answer": answer })    


@api_blueprint.route('/embed-and-store', methods=['POST'])
def embed_and_store():
    url = request.json['url']
    url_text = scraping_service.scrape_website(url)
    chunks = chunk_text(url_text)
    pinecone_service.embed_chunks_and_upload_to_pinecone(chunks, PINECONE_INDEX_NAME)
    response_json = {
        "message": "Chunks embedded and stored successfully"
    }
    return jsonify(response_json)

@api_blueprint.route('/delete-index', methods=['POST'])
def delete_index():
    pinecone_service.delete_index(PINECONE_INDEX_NAME)
    return jsonify({"message": f"Index {PINECONE_INDEX_NAME} deleted successfully"})

# my routes 

@api_blueprint.route('/docs', methods=['POST'])
def get(self):
    # if 'file' not in request.files:
    #     return redirect(request.url)
    # file = request.files['file']
    # If the user does not select a file, the browser submits an
    # empty file without a filename.
    # if file.filename == '':
    #     flash('No selected file')
    #     return redirect(request.url)
    # if file and allowed_file(file.filename):
    #     filename = secure_filename(file.filename)
    #     file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    #     return redirect(url_for('download_file', name=filename))
    pdf_docs = request.files
    # get pdf text
    raw_text = get_pdf_text(PdfReader, pdf_docs)

    # get the text chunks
    chunks = chunk_text(raw_text)
    # text_chunks = get_text_chunks(CharacterTextSplitter, raw_text)
    pinecone_service.embed_chunks_and_upload_to_pinecone(chunks, PINECONE_INDEX_NAME)
    response_json = {
        "message": "Chunks embedded and stored successfully"
    }
    return jsonify(response_json)

    # create vector store
    # vectorstore = get_vectorstore(text_chunks)

    # # create conversation chain
    # st.session_state.conversation = get_conversation_chain(vectorstore)
    # return 'This is doc endpoint'

# @api_blueprint.route('/docs', methods=['POST'])
# def get_conversation_chain(vectorstore):
#     llm = ChatOpenAI()
#     # llm = HuggingFaceHub(repo_id="google/flan-t5-xxl", model_kwargs={"temperature":0.5, "max_length":512})

#     memory = ConversationBufferMemory(memory_key='chat_history', return_messages=True)
#     conversation_chain = ConversationalRetrievalChain.from_llm(
#         llm=llm,
#         retriever=vectorstore.as_retriever(),
#         memory=memory
#     )
#     return conversation_chain