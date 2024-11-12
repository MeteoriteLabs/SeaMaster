from backend import create_app
from dotenv import load_dotenv

load_dotenv()

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)

# app = create_app()

# if __name__ == '__main__':
#     app.run(debug=True)



# import time

# import redis
# from flask import Flask
# from flask_restful import Resource, Api, reqparse

# from PyPDF2 import PdfReader
# from langchain.text_splitter import CharacterTextSplitter
# # from langchain.embeddings import OpenAIEmbeddings, HuggingFaceInstructEmbeddings
# # from langchain_openai import OpenAIEmbeddings
# from langchain_community.embeddings import HuggingFaceInstructEmbeddings, OpenAIEmbeddings
# from langchain_community.vectorstores import FAISS
# from langchain_community.chat_models import ChatOpenAI
# from langchain.chains.conversation.memory import ConversationBufferMemory
# from langchain.chains import ConversationalRetrievalChain
# from langchain_community.llms import HuggingFaceHub


# app = Flask(__name__)
# api = Api(app)
# cache = redis.Redis(host='redis', port=6379)
# parser = reqparse.RequestParser()

# def get_hit_count():
#     retries = 5
#     while True:
#         try:
#             return cache.incr('hits')
#         except redis.exceptions.ConnectionError as exc:
#             if retries == 0:
#                 raise exc
#             retries -= 1
#             time.sleep(0.5)

# # @app.route('/')
# # def hello():
# #     count = get_hit_count()
# #     return 'Hello World! I have been seen {} times.\n'.format(count)


# class HelloWorld(Resource):
#     def get(self):
#         count = get_hit_count()
#         return 'Hello World! I have been seen {} times.\n'.format(count)
#         # return {'hello': 'world'}


# class HandleDocs(Resource):

#     def get(self):
#         # get pdf text
#         raw_text = get_pdf_text(pdf_docs)

#         # get the text chunks
#         text_chunks = get_text_chunks(raw_text)

#         # create vector store
#         vectorstore = get_vectorstore(text_chunks)

#         # create conversation chain
#         st.session_state.conversation = get_conversation_chain(
#                     vectorstore)
#         return 'This is doc endpoint'


# class HandleQuery(Resource):
#     def get_conversation_chain(vectorstore):
#         llm = ChatOpenAI()
#         # llm = HuggingFaceHub(repo_id="google/flan-t5-xxl", model_kwargs={"temperature":0.5, "max_length":512})

#         memory = ConversationBufferMemory(
#             memory_key='chat_history', return_messages=True)
#         conversation_chain = ConversationalRetrievalChain.from_llm(
#             llm=llm,
#             retriever=vectorstore.as_retriever(),
#             memory=memory
#         )
#         return conversation_chain

#     def get(self):
#         return 'This is query endpoint'

# api.add_resource(HelloWorld, '/')
# api.add_resource(HandleDocs, '/docs')
# api.add_resource(HandleQuery, '/query')

# if __name__ == '__main__':
#     app.run(debug=True)